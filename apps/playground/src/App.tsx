import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import {
  Layout,
  Footer,
  Header,
  Main,
  Navbar,
  Logo,
  DropdownMenu,
  Input,
  Button,
  Select,
  Checkbox,
  Spinner,
  Modal,
} from "@emadunan/react-ui";
import { IoMdArrowDropdown } from "react-icons/io";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(true);
  return (
    <Layout>
      <Header
        title="Property Rents"
        logo={
          <Logo>
            <img src={logo} alt="App logo" />
          </Logo>
        }
        actions={
          <DropdownMenu
            trigger={
              <div
                style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}
              >
                <IoMdArrowDropdown size={18} /> Emad Younan
              </div>
            }
          >
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
        nav={
          <Navbar>
            <a href="/">Home</a>
            <a href="/create">Create</a>
            <a href="/inquire" className="active">Inquire</a>
          </Navbar>
        }
      />
      <Main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "30rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: ".3rem" }}
            >
              <Select size="sm">
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size="sm" />
              <Button size="sm">تعديل البيانات</Button>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
            >
              <Select size="md">
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size="md" />
              <Button>ارسال</Button>
            </div>

            <div
              style={{ display: "flex", alignItems: "flex-end", gap: ".3rem" }}
            >
              <Select size="lg">
                <Select.Option>EGP</Select.Option>
                <Select.Option>UAE</Select.Option>
                <Select.Option>KSA</Select.Option>
              </Select>
              <Input size="lg" />
              <Button size="lg">ارسال</Button>
            </div>
            <Checkbox label="Save" size="sm" />
            <Checkbox label="Save" size="md" />
            <Checkbox label="Save" size="lg" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Modal title="Delete Property" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
              <h2>Hi there</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque distinctio qui voluptatum maiores illo eligendi ipsa quasi. Porro mollitia vel reiciendis deserunt corporis animi nesciunt rerum quasi qui beatae fugiat dolorem architecto quaerat veniam harum sequi eligendi, consectetur delectus consequuntur alias ducimus! Earum nobis veritatis voluptatibus modi, doloribus nulla blanditiis. Temporibus laboriosam officia minus sit repudiandae, enim expedita fugit illo cupiditate eius atque ullam fuga nisi excepturi dolore necessitatibus, voluptates vitae quos laudantium debitis ab molestias reprehenderit! Earum fuga excepturi debitis deleniti facilis incidunt aliquam ut a dolorum molestias assumenda nulla nihil distinctio ducimus, laborum rem tenetur, dicta beatae! Aut, sequi nulla ut vero exercitationem facere debitis error blanditiis veniam consectetur maiores omnis minima quae deleniti laudantium recusandae? Inventore repellendus aperiam quod quae molestiae dolor culpa rem velit impedit doloremque optio explicabo tempora illum dignissimos veniam, cupiditate, corporis laudantium in nostrum, incidunt ullam ea. Tempore nisi nam, qui corrupti quo doloribus dignissimos aliquid quod. Accusamus quia cumque nesciunt distinctio ex aliquid eaque magni, necessitatibus quidem commodi quos corporis. Ipsam odio quidem quibusdam dignissimos, quasi dolor, eaque incidunt velit architecto ex quaerat commodi veniam alias? Accusamus labore harum ipsa tempore dignissimos, aperiam aliquam suscipit iure deserunt expedita culpa distinctio quos.</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <Button onClick={() => alert("Approved!")}>Approve</Button>
                <Button variant="error" onClick={() => setIsOpenModal(false)}>Close</Button>
                <Button variant="info" onClick={() => setIsOpenModal(false)}>Close</Button>
                <Button variant="secondary" onClick={() => setIsOpenModal(false)}>Close</Button>
                <Button variant="success" onClick={() => setIsOpenModal(false)}>Close</Button>
                <Button variant="warning" onClick={() => setIsOpenModal(false)}>Close</Button>
              </div>
            </Modal>
          </div>
        </div>
      </Main>
      <Footer>
        <p>General Administration of Information Technology.</p>
        <p>© 2025 Property Rents. All rights reserved.</p>
        <p>Contact: emadunan@moi.gov.eg</p>
      </Footer>
    </Layout>
  );
}

export default App;
