import { isArray, isNullOrWhitespace } from "./type-helpers";

/**
 * Determines if the value specified is truthy. Truthy values are generally `true`, `1`
 * @param value Value to check
 * @returns Where value is truthy
 */
export const isTruthy = (value: any) => {
  return value != null && (value === true || value == 1 || value === "true");
};

/**
 * Determines if the parameters provided meets the conditions to perform a search.
 * For a search condition to be met, at least, either a search string or a search value should be provided
 * @param search List of search strings
 * @param columns List of search columns
 * @returns A boolean value to determine if search condition is met
 */
export const hasSearchParams = (search?: string[], columns?: string[]) => {
  return (
    (search != null &&
      isArray(search) &&
      search.length > 0 &&
      search.some((value) => !isNullOrWhitespace(value))) ||
    (columns != null &&
      isArray(columns) &&
      columns.length > 0 &&
      search?.some((value) => !isNullOrWhitespace(value)))
  );
};

const getFilterColumn = (
  selectedColumn: string,
  options: any[],
  defaultValue: string
) => {
  const col = options?.find(
    (opt) =>
      (opt.key != null && opt.key === selectedColumn) || opt === selectedColumn
  );
  return (!col?.value ? col : col?.value) ?? defaultValue;
};

/**
 * Constructs an SQL search query based of the search parameter supplied.
 *
 * For eg, if search = `['adam', 20]`; columns = `['Title', 'Amount']`; operators = `[Contains, IsGreaterThan]`; stacks = `['AND']`,
 * then an SQL query will be generated, thus: `Title LIKE '%adam%' AND Amount > 20`.
 * @param search List of search strings
 * @param columns List of search columns
 * @param operators Lists of search operators
 * @param stacks List of search stack
 * @param options More search options
 * @returns SQL interpretation for required search
 */
export const getSearchFilters = (
  search: string[],
  columns: string[],
  operators?: string[],
  stacks?: string[],
  options?: { defaultColumn?: any; searchColumnOptions?: any[] }
): [string, any, string] => {
  const numOfFilters = Math.max(columns.length, search.length);

  // Combine filter components (value, columns, operators, etc) into a single array
  // All fields in individual objects are filled with default values if no value is provided
  // A `valueParam` field is added to each object in the array
  const filters = Array.from(Array(numOfFilters)).map((value, i) => {
    const filter = {
      column: getFilterColumn(
        columns[i],
        options?.searchColumnOptions ?? [],
        options?.defaultColumn
      ),
      value: search[i] ?? "",
      valueParam: `search${i}`,
      operator: operators
        ? parseInt(operators[i]) || RegExOperators.Contains
        : RegExOperators.Contains,
      stack: stacks ? getFilterStack(stacks[i]) ?? "AND" : "AND",
    };

    return filter;
  });

  // Map search string values to the params
  const searchValueMap: any = {};
  filters.forEach((filter, i) => {
    searchValueMap[filter.valueParam] = filter.value;
  });

  // Generate search sql query
  const searchQuery = filters
    .map((filter, i, arr) => {
      // Get appropriare expression and a new value for the search string
      // A new value is generated which will appropriately replace the param in the expression
      // For eg. in the expression `Title LIKE '%ea'`, the provided value should be `ea`,
      // but to allow for proper SQL injection, the right hand expression ie. `%ea`
      // is returned as the new value and replaced by a parameter
      const [rightExpression, newValue] = getFilterRegex(
        filter.value,
        `:${filter.valueParam}`,
        filter.operator
      );
      searchValueMap[filter.valueParam] = newValue;

      const stack = i < arr.length - 1 ? filter.stack : "";

      const expression = `(${filter.column} ${rightExpression}) ${stack}`;
      return expression;
    }, "")
    .join(" ");

  // Generate the raw sql query
  let rawQuery = "";
  Object.keys(searchValueMap).forEach((map) => {
    rawQuery = searchQuery.replace(`:${map}`, searchValueMap[map]);
  });

  // Return the parameterized SQL query, the parameter mappings and the raw SQL query
  return [searchQuery, searchValueMap, rawQuery];
};

/**
 * Returns the appropiate search stack value. 1 or 'or' will return the `OR` operator stack; `AND` will be returned otherwise.
 * @param value Specified search stack
 * @returns The appropriate search stack value
 */
export const getFilterStack = (value: string) => {
  return value == "1" || value?.toLowerCase() == "or" ? "OR" : "AND";
};

/**
 * Generates an SQL conditional based on the value and operation to carry out.
 *
 * Eg, If value = `'adam'`; operator = `LIKE`,
 *
 * then an SQL conditional is generated, thus: `LIKE '%adam%'`
 * @param value The search string
 * @param operator Specified search operator
 * @returns An SQL conditional statement
 */
export const getFilterRegex = (
  value: string,
  valueParam: string,
  operator?: RegExOperators
) => {
  switch (parseInt(operator?.toString() ?? "")) {
    case RegExOperators.Contains:
      return [`LIKE ${valueParam}`, `%${value}%`];
    case RegExOperators.Equals:
      return [`= ${valueParam}`, value];
    case RegExOperators.StartsWith:
      return [`LIKE ${valueParam}`, `${value}%'`];
    case RegExOperators.EndsWith:
      return [`LIKE %${valueParam}`, `%${value}`];
    case RegExOperators.IsEmpty:
      return [`IS NULL`, ""];
    case RegExOperators.IsNotEmpty:
      return [`IS NOT NULL`, ""];
    case RegExOperators.IsGreaterThan:
      return [`> ${value}`, value];
    case RegExOperators.IsLessThan:
      return [`< ${value}`, value];
    default:
      return [`LIKE ${valueParam}`, `%${value}%`];
  }
};

/**
 * Available SQL operator options
 */
export enum RegExOperators {
  Contains,
  Equals,
  StartsWith,
  EndsWith,
  IsEmpty,
  IsNotEmpty,
  IsGreaterThan,
  IsLessThan,
  IsAnyOf,
}

/**
 * Returns the appropriate order value from the specified value.
 * `ASC` will be returned by truthy values or by its own string representation; `DESC` will be returned otherwise
 * @param value Specified order
 * @returns Appropriate order value
 */
export const getOrder = (
  value?: string,
  setAscendingAsDefault?: boolean
): "ASC" | "DESC" => {
  if (setAscendingAsDefault) {
    const isDescending =
      value?.toLowerCase() == "desc" || value == "1" || value == "true";
    return isDescending ? "DESC" : "ASC";
  }

  const isAscending =
    value?.toLowerCase() == "asc" || value == "0" || value == "false";
  return isAscending ? "ASC" : "DESC";
};

/**
 * Gets the appropriate column to perform sort operation.
 * If an invalid column is supplied (via `value` param), the `defaultValue` is used instead.
 * @param value Column to perform sort operation on
 * @param options Ebabked columns for sorting
 * @param defaultValue Default column for sort operatiion
 * @returns The appropriate column for a sort operation
 */
export const getSort = (
  value: string,
  options: any[],
  defaultValue: string = "e.dateModified"
) => {
  const sortValue =
    options.find(
      (option) =>
        (option.key != null && option.key === value) || option === value
    ) ?? defaultValue;
  return !sortValue?.value ? sortValue : sortValue.value;
};

/**
 * Generates an SQL statement, appending the specified filters to the existing SQL statement
 * @param filters List of SQL filters
 * @param subSql SQL statement to append filters to
 * @returns An SQL statement with the appropriate filters
 */
export const getFilterQuery = (
  filters: string[],
  seperator: FilterSeparator = "AND"
) => {
  let sql = "";
  filters.forEach((query) => {
    if (isNullOrWhitespace(sql)) {
      sql = query;
    } else {
      sql += ` ${seperator} ${query}`;
    }
  });

  return sql;
};

type FilterSeparator = "AND" | "OR";
