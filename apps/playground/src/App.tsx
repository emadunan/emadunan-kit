import './App.css';
import logo from './assets/logo.png';
import { Layout, Footer, Header, Main, Navbar, Logo, DropdownMenu, Input, Button, Select, Checkbox } from "@emadunan/react-ui";
import { IoMdArrowDropdown } from "react-icons/io";

function App() {

  return (
    <Layout>
      <Header
        title='Property Rents'
        logo={<Logo><img src={logo} alt='App logo' /></Logo>}
        actions={
          <DropdownMenu trigger={<div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}><IoMdArrowDropdown size={18} /> Emad Younan</div>}>
            <DropdownMenu.Item onClick={() => console.log("Profile")}>
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => console.log("Settings")}>
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={() => console.log("Logout")}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu>
        }
        nav={<Navbar links={[
          { label: 'Add Property', href: '/add-property' },
          { label: 'Register Rent', href: '/register-rent' },
          { label: 'Reports', href: '/reports' },
        ]} activeHref="/add-property" />}
      />
      <Main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "30rem", display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
              <Select size='sm'>
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size='sm' />
              <Button size='sm'>تعديل البيانات</Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
              <Select size='md'>
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size='md' />
              <Button>ارسال</Button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
              <Select size='lg'>
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size='lg' />
              <Button size='lg'>ارسال</Button>
            </div>
          <Checkbox label='Save' size='sm'/>
          <Checkbox label='Save' size='md'/>
          <Checkbox label='Save' size='lg'/>
          </div>
        </div>
      </Main>
      <Footer>
        <p>General Administration of Information Technology.</p>
        <p>© 2025 Property Rents. All rights reserved.</p>
        <p>Contact: emadunan@moi.gov.eg</p>
      </Footer>
    </Layout>
  )
}

export default App;
