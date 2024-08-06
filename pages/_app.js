import '../styles/globals.css';  // Import global CSS styles
import Header from '../app/Components/Header';  // Import Header component

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />  
            <Component {...pageProps} />  
        </>
    );
}

export default MyApp;
