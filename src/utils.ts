// Build an in-site URL that respects the deploy base path (`/traditions/`).
// url('') -> '/traditions/', url('mind') -> '/traditions/mind',
// url('technique/zazen') -> '/traditions/technique/zazen'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p = '') => base + '/' + p.replace(/^\//, '');

export const catHue: Record<string, number> = { mind: 258, body: 152, breath: 199, diet: 28 };
