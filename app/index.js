import './scss/index.scss';
import './js/components/modal';
import './js/components/changeImg';
import './js/components/changeText';

const importAll = (r) => r.keys().forEach(r);
importAll(require.context('./scss/imports/', true, /.scss$/));
importAll(require.context('../app/img/', true, /.(jpg|svg|png)$/));
