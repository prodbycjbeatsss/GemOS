// One group contract sizes both cards and both panels from the largest content.
export function groupGeometry(measurements, minimum = 512) {
  const max = key => Math.ceil(Math.max(0,...measurements.map(m=>m[key] || 0)));
  const header=max('header'),footer=Math.max(52,max('footer')),insets=max('insets');
  const recess=Math.max(max('recess'),minimum-header-footer-insets-32);
  return {header,recess,footer,slot:header+recess+footer+insets+32};
}
