const fs = require('fs');
const path = require('path');

/**
 * Custom changeset plugin to update JSR version
 */
const jsrVersionPlugin = {
  name: 'update-jsr-json',
  
  // This runs after Changeset updates the package.json version
  afterVersionChange: async ({ 
    packageJson, 
    version, 
    cwd, 
    packagePath 
  }) => {
    try {
      const jsrJsonPath = path.join(path.dirname(packagePath), 'jsr.json');
      if (fs.existsSync(jsrJsonPath)) {
        const jsrJson = JSON.parse(fs.readFileSync(jsrJsonPath, 'utf8'));
        
        // Update the version field
        jsrJson.version = version;
        
        // Write the updated jsr.json
        fs.writeFileSync(
          jsrJsonPath, 
          JSON.stringify(jsrJson, null, 2) + '\n'
        );
        
        console.log(`Updated jsr.json version to ${version}`);
      } else {
        console.log('No jsr.json file found, skipping JSR version update');
      }
    } catch (error) {
      console.error('Error updating JSR version:', error);
    }
  }
};

module.exports = jsrVersionPlugin;