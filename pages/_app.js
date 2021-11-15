import '../styles/globals.css'
import 'styles/react-tabs.css';
import '../styles/Home.css';

import MetaTags from '/components/MetaTags.tsx'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <MetaTags />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
