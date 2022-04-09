type RoarrOptions = {
  ROARR_LOG: boolean,
  ROARR_FILTER: string | null,
}

const ROARR_OPTIONS: RoarrOptions = {
  ROARR_LOG: true,
  ROARR_FILTER: null,
};

if (process.env.NODE_ENV !== 'development') {
  ROARR_OPTIONS.ROARR_FILTER = 'context.logLevel:>=30';
  localStorage.setItem('ROARR_FILTER', ROARR_OPTIONS.ROARR_FILTER);
}

localStorage.setItem('ROARR_LOG', ROARR_OPTIONS.ROARR_LOG.toString());

export default ROARR_OPTIONS;
