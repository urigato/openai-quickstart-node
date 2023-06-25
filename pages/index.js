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
  Textarea, Checkbox, Row, Col, Loading
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
  const [isDisable, setIsDisable] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsDisable(true);
    try {
      const response = await fetch("/api/generate2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: introInput ? JSON.stringify({
          myCompanyText: myCompanyInput,
          myNameText: myNameInput,
          reCompanyText: reCompanyInput,
          reNameText: reNameInput,
          emailBodyText: emailBodyInput,
          // purposeText: purposeInput,
          // questionText: questionInput
        }) : JSON.stringify({emailBodyText: emailBodyInput}),
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
    setIsDisable(false);
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

        <Container lg>
          {/* <img src="/logo.png" className={styles.icon} /> */}
          <Text h4>
            비즈니스 영문 이메일을 빠르게 작성하세요~!
          </Text>
          <Grid.Container gap={2} justify="center">
          <Grid sm={6}>
            <form onSubmit={onSubmit}>
              <Checkbox
                  defaultSelected
                  size="sm"
                  fullWidth
                  checked={introInput}
                  name="intro"
                  onChange={setIntroInput}>인사말 추가</Checkbox>
              <Grid.Container gap={1}>
                <Grid xs={6}>
                  <Input
                      disabled={!introInput}
                      type="text"
                      bordered
                      fullWidth
                      status="primary"
                      labelLeft="작성자 회사명"
                      name="myCompany"
                      placeholder="회사 이름"
                      value={myCompanyInput}
                      onChange={(e) => setMyCompanyInput(e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                      disabled={!introInput}
                      required
                      bordered
                      fullWidth
                      status="primary"
                      type="text"
                      labelLeft="작성자 이름"
                      name="myName"
                      placeholder="작성자 이름"
                      value={myNameInput}
                      onChange={(e) => setMyNameInput(e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                      disabled={!introInput}
                      type="text"
                      bordered
                      fullWidth
                      status="primary"
                      labelLeft="수신자 회사명"
                      name="reCompany"
                      placeholder="회사 이름"
                      value={reCompanyInput}
                      onChange={(e) => setReCompanyInput(e.target.value)}
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                      disabled={!introInput}
                      required
                      bordered
                      fullWidth
                      type="text"
                      status="primary"
                      labelLeft="수신자 이름"
                      name="reName"
                      placeholder="수신자 이름"
                      value={reNameInput}
                      onChange={(e) => setReNameInput(e.target.value)}
                  />
                </Grid>
                <Grid xs={12}>
                  <Textarea
                      required
                      fullWidth
                      bordered
                      rows={15}
                      label="내용"
                      status="primary"
                      name="emailBody"
                      placeholder="목적이나 질문을 작성하세요."
                      value={emailBodyInput}
                      onChange={(e) => setEmailBodyInput(e.target.value)}
                  />
                </Grid>
                <Grid xs={12}>
                  <Button css={{width:"100%"}} type="submit" size="xl" disabled={isDisable}>{!isDisable ? '영문 이메일 생성' :
                      <Loading type="points" color="currentColor" size="sm" />}</Button>
                </Grid>
              </Grid.Container>

              {/* <h5>질문</h5>
            <textarea
              rows="10"
              type="text"
              name="question"
              placeholder="질문을 입력하세요."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
            /> */}



            </form>
          </Grid>
          <Grid sm={6}>
            <Textarea
                label="영문 이메일 결과"
                readOnly
                bordered
                fullWidth
                rows="25"
                className={styles.result}
                value={result}
            ></Textarea>
          </Grid>
          </Grid.Container>
        </Container>
      </Layout>

  );
}
