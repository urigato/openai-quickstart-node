import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Badge,
  Spacer,
  Container,
  Grid,
  Input,
  Textarea, Checkbox
} from "@nextui-org/react";

import { Layout } from "../component/Layout.js";

export default function Home() {
  const [myCompanyInput, setMyCompanyInput] = useState("");
  const [myNameInput, setMyNameInput] = useState("");
  const [reCompanyInput, setReCompanyInput] = useState("");
  const [reNameInput, setReNameInput] = useState("");
  const [emailBodyInput, setEmailBodyInput] = useState("");
  // const [purposeInput, setPurposeInput] = useState("");
  // const [questionInput, setQuestionInput] = useState("");
  const [introInput, setIntroInput] = useState(true);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myCompanyText: myCompanyInput,
          myNameText: myNameInput,
          reCompanyText: reCompanyInput,
          reNameText: reNameInput,
          emailBodyText: emailBodyInput,
          // purposeText: purposeInput,
          // questionText: questionInput,
          introFlag: introInput,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log(data.result);
      setResult(data.result);
      // setMyCompanyInput("");
      // setMyNameInput("");
      // setReCompanyInput("");
      // setReNameInput("");
      // setPurposeInput("");
      // setQuestionInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
      <Layout>
        <Head>
          <title>Morse Toss</title>
          <link rel="icon" href="/icon.png" />
        </Head>

        <Navbar variant="static">
          <Navbar.Brand >
            <img src={"/icon.png"} height="60" alt="logo" />
            <Spacer x={0.5} />
            <Text b size={24} color="inherit">
              Morse Toss
            </Text>
            <Spacer x={0.2} />
            <Badge color="error">Bata</Badge>
          </Navbar.Brand>
          {/*<Navbar.Content hideIn="xs">*/}
          {/*  <Navbar.Link href="#">Features</Navbar.Link>*/}
          {/*  <Navbar.Link isActive href="#">Customers</Navbar.Link>*/}
          {/*  <Navbar.Link href="#">Pricing</Navbar.Link>*/}
          {/*  <Navbar.Link href="#">Company</Navbar.Link>*/}
          {/*</Navbar.Content>*/}
          {/*<Navbar.Content>*/}
          {/*  <Navbar.Link color="inherit" href="#">*/}
          {/*    Login*/}
          {/*  </Navbar.Link>*/}
          {/*  <Navbar.Item>*/}
          {/*    <Button auto flat as={Link} href="#">*/}
          {/*      Sign Up*/}
          {/*    </Button>*/}
          {/*  </Navbar.Item>*/}
          {/*</Navbar.Content>*/}
        </Navbar>

        <Container>
          {/* <img src="/logo.png" className={styles.icon} /> */}
          <Text h4>
            비즈니스 영문 이메일을 빠르게 작성하세요~!
          </Text>
          <Grid.Container gap={2} justify="center">
            <Grid sm>
              <form onSubmit={onSubmit}>
                <Input
                    type="text"
                    bordered
                    fullWidth
                    label="작성자 회사명"
                    name="myCompany"
                    placeholder="회사 이름"
                    value={myCompanyInput}
                    onChange={(e) => setMyCompanyInput(e.target.value)}
                />
                <Input
                    required
                       bordered
                    fullWidth
                       type="text"
                       label="작성자 이름"
                       name="myName"
                       placeholder="작성자 이름"
                       value={myNameInput}
                       onChange={(e) => setMyNameInput(e.target.value)}
                />
                <Input
                    type="text"
                    bordered
                    fullWidth
                    label="수신자 회사명"
                    name="reCompany"
                    placeholder="회사 이름"
                    value={reCompanyInput}
                    onChange={(e) => setReCompanyInput(e.target.value)}
                />
                <Input required
                       bordered
                       fullWidth
                       type="text"
                       label="수신자 이름"
                       name="reName"
                       placeholder="수신자 이름"
                       value={reNameInput}
                       onChange={(e) => setReNameInput(e.target.value)}
                />
                <Textarea
                    required
                    fullWidth
                    bordered
                    rows="20"
                    label="내용"
                    name="emailBody"
                    placeholder="목적이나 질문을 작성하세요."
                    value={emailBodyInput}
                    onChange={(e) => setEmailBodyInput(e.target.value)}
                />
                {/* <h5>질문</h5>
              <textarea
                rows="10"
                type="text"
                name="question"
                placeholder="질문을 입력하세요."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              /> */}
                <Checkbox
                    defaultSelected
                    size="sm"
                    fullWidth
                    checked={introInput}
                    name="intro"
                    onChange={(e) => setIntroInput(e.target.value)}>인사말 추가</Checkbox>

                <Button type="submit">영문 이메일 생성</Button>

              </form>
            </Grid>
            <Grid sm>
              <Textarea
                  label="영문 이메일 결과"
                  readOnly
                  bordered
                  fullWidth
                  rows="30"
                  className={styles.result}
                  value={result}
              ></Textarea>
            </Grid>
          </Grid.Container>

        </Container>
      </Layout>

  );
}
