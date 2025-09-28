import './App.css';
import logo from './assets/logo.png';
import { Layout, Footer, Header, Main, Navbar, Logo } from "@emadunan/react-ui";

function App() {

  return (
    <Layout>
      <Header
        title='Property Rents'
        logo={<Logo><img src={logo}alt='App logo' /></Logo>}
        actions={<div></div>}
        nav={<Navbar links={[
          { label: 'Add Property', href: '/add-property' },
          { label: 'Register Rent', href: '/register-rent' },
          { label: 'Reports', href: '/reports' },
        ]}/>}
      />
      <Main>Main content</Main>
      <Footer>This is the footer of the App</Footer>
    </Layout>
  )
}

export default App;
