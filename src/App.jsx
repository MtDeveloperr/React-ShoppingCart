import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';


function App() {
  return (
     //value olarak dogrudan state kullanabiliyoruz veya static degerde verebiliriz
    <CartContextProvider>
      <Header/>
      <Shop />
    </CartContextProvider>
  );
}

export default App;
 