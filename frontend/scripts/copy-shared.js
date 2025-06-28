#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Source and destination paths
const sharedSrcPath = path.join(__dirname, '../../packages/shared/src');
const frontendSharedPath = path.join(__dirname, '../src/shared');

// Ensure the destination directory exists
if (fs.existsSync(frontendSharedPath)) {
    fs.rmSync(frontendSharedPath, { recursive: true, force: true });
}
fs.mkdirSync(frontendSharedPath, { recursive: true });

// Copy files
function copyFile(src, dest) {
    const content = fs.readFileSync(src, 'utf8');
    fs.writeFileSync(dest, content);
}

// Copy the main files
copyFile(path.join(sharedSrcPath, 'types.ts'), path.join(frontendSharedPath, 'types.ts'));
copyFile(path.join(sharedSrcPath, 'utils.ts'), path.join(frontendSharedPath, 'utils.ts'));
copyFile(path.join(sharedSrcPath, 'index.ts'), path.join(frontendSharedPath, 'index.ts'));

console.log('✓ Shared types copied to frontend/src/shared/');
