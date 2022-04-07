localStorage.setItem('ROARR_LOG', true);
if (process.env.NODE_ENV !== 'development')
    localStorage.setItem('ROARR_FILTER', 'context.logLevel:>=30');
