import * as fs from "fs-extra";
import * as path from "path";

const migrationsDir = path.join(__dirname, "..", "migrations"); // Adjust the path to your migrations directory
const output = process.env.npm_config_output;
const outputPath = path.join(path.resolve("./"), output ?? "migrations.sql"); // Path to the output SQL script

const from = process.env.npm_config_from;
const to = process.env.npm_config_to;

async function generateSqlScript() {
  try {
    // Read the migrations directory
    const files = await fs.readdir(migrationsDir);
    const fileInfos: FileMigration[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const filePath = path.join(migrationsDir, file);
      // Read content on file
      const content = await fs.readFile(filePath, "utf-8");

      // Match the migration name
      const migrationMatch = content.match(/name = "([\s\S]*?)";/);

      // If file matches, ...
      if (migrationMatch) {
        // add file info
        const fileInfo = {
          key: i,
          file,
          migrationName: migrationMatch[1],
        };

        fileInfos.push(fileInfo);
      }
    }

    let isDown = false;
    let tempFiles: string[] = [];
    let fromMig: FileMigration = fileInfos[fileInfos.length - 1];

    // If `from` or `to` destinations are provided
    if (from || to) {
      let toMig: FileMigration | null = null;

      // If `from` destination is provided
      if (from) {
        // Check if migration exists
        let _fromMig = fileInfos.find((e) => e.migrationName == from);
        // If not exists,
        if (!_fromMig) {
          // return error
          console.error("Invalid `from` migration");
          return;
        }
        fromMig = _fromMig;
      }

      // If `to` destination is provided
      if (to) {
        // Check if migration exists
        let _toMig = fileInfos.find((e) => e.migrationName == to);
        // If not exists,
        if (!_toMig) {
          console.error("Invalid `to` migration");
          // return error
          return;
        }

        toMig = _toMig;
      }

      // Flag to indicate if migration is in reverse direction
      isDown = toMig != null && toMig.key < fromMig.key;

      // If no `to` migration, ...
      if (!toMig) {
        // ... set `to` destination to `from` destination
        tempFiles = fileInfos
          .filter((e) => e.key === fromMig.key)
          .map((e) => e.file);
      } else {
        // Arrange file: `from` - `to`
        let upper = Math.max(fromMig.key, toMig.key);
        let lower = Math.min(fromMig.key, toMig.key);

        tempFiles = fileInfos
          .filter((e) => e.key >= lower && e.key <= upper)
          .map((e) => e.file);
      }
    }
    // else, set destination to the last migration
    else {
      tempFiles = [fromMig.file];
    }

    // Ensure the output file is empty
    await fs.ensureFile(outputPath);
    await fs.writeFile(outputPath, "-- TypeORM Migrations SQL Script\n\n");

    for (const file of tempFiles) {
      const filePath = path.join(migrationsDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      // Extract the up SQL queries from the migration file
      const upSqlMatch = content.match(
        /public async up\(queryRunner: QueryRunner\): Promise<void> {([\s\S]*?)}/
      );
      const downSqlMatch = content.match(
        /public async down\(queryRunner: QueryRunner\): Promise<void> {([\s\S]*?)}/
      );

      if (!isDown && upSqlMatch) {
        const upSqlStatements = upSqlMatch[1].match(
          /await queryRunner.query\(`([\s\S]*?)`\);/g
        );
        if (upSqlStatements) {
          await fs.appendFile(outputPath, `-- Migration: ${file} - UP\n`);
          for (const statement of upSqlStatements) {
            const sql = statement.match(
              /await queryRunner.query\(`([\s\S]*?)`\);/
            );
            if (sql) {
              let sqlStr = sql[0].trim();
              sqlStr = sqlStr.replace("await queryRunner.query(`", "");
              sqlStr = sqlStr.substring(0, sqlStr.length - 3);

              sqlStr = sqlStr.replace(/\\`/g, "`").trim();
              sqlStr += ";";

              await fs.appendFile(outputPath, `${sqlStr}\n\n`);
            }
          }
        }
      } else if (downSqlMatch) {
        const downSqlStatements = downSqlMatch[1].match(
          /await queryRunner.query\(`([\s\S]*?)`\);/g
        );
        if (downSqlStatements) {
          await fs.appendFile(outputPath, `-- Migration: ${file} - DOWN\n`);
          for (const statement of downSqlStatements) {
            const sql = statement.match(
              /await queryRunner.query\(`([\s\S]*?)`\);/
            );
            if (sql) {
              let sqlStr = sql[0].trim();
              sqlStr = sqlStr.replace("await queryRunner.query(`", "");
              sqlStr = sqlStr.substring(0, sqlStr.length - 3);

              sqlStr = sqlStr.replace(/\\`/g, "`").trim();
              sqlStr += ";";

              await fs.appendFile(outputPath, `${sqlStr}\n\n`);
            }
          }
        }
      }
    }

    console.log("SQL script generated successfully.");
  } catch (error) {
    console.error("Error generating SQL script:", error);
  }
}

type FileMigration = {
  /**
   * Index of migration file
   */
  key: number;
  /**
   * Name of the of migration
   */
  migrationName: string;
  /**
   * Path to migration file
   */
  file: string;
};

generateSqlScript();
