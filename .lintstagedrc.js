module.exports = {
  "*.{js,jsx,ts,tsx}": (files) => {
    // __tests__ 디렉토리와 jest 설정 파일 제외
    const nonTestFiles = files.filter(
      file => !file.includes('__tests__') && !file.includes('jest.')
    );
    if (nonTestFiles.length === 0) return [];
    return [`eslint --fix ${nonTestFiles.join(' ')}`];
  },
  "*.{json,md,html,css}": ["prettier --write"]
}; 