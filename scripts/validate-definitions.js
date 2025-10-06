const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

/**
 * Validation script for JSON definition files.  This script is invoked by
 * `npm run validate` and used by CI to ensure contributor definitions conform
 * to their schemas.
 */

const root = path.resolve(__dirname, '..');
const schemaDir = path.join(root, 'schema');

function loadSchema(name) {
  const p = path.join(schemaDir, `${name}.schema.json`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validators = {
  hack: ajv.compile(loadSchema('hack-level')),
  profile: ajv.compile(loadSchema('profile-level')),
  habit: ajv.compile(loadSchema('habit'))
};

let errors = 0;

function validateDir(dir, type) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
    if (!file.endsWith('.json')) return;
    const fullPath = path.join(dir, file);
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const validate = validators[type];
      const valid = validate(data);
      if (!valid) {
        console.error(`\n❌ Invalid ${type} definition: ${file}`);
        console.error(ajv.errorsText(validate.errors, { separator: '\n' }));
        errors++;
      } else {
        console.log(`✅ ${type} definition valid: ${file}`);
      }
    } catch (err) {
      console.error(`\n❌ Failed to parse ${file}:`, err.message);
      errors++;
    }
  });
}

validateDir(path.join(root, 'levels'), 'hack');
validateDir(path.join(root, 'profiles', 'profile-levels'), 'profile');
validateDir(path.join(root, 'habits'), 'habit');

if (errors > 0) {
  console.error(`\n${errors} definition(s) failed validation`);
  process.exit(1);
} else {
  console.log('\nAll definitions are valid.');
}