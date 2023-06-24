import { Text, Spacer } from "@nextui-org/react";
import { Box } from "./Box.js";
import styles from "./index.module.css";


export const Content = () => (
    <Box>
        <Text h1>Content</Text>
        <Spacer y={1} />
        <Text p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Text>
        <h3>
            비즈니스 영문 이메일을 빠르게 작성하세요~!
        </h3>
        <div className={styles.box_container}>
            <div className="box">
                <form onSubmit={onSubmit}>
                    <h5>작성자 회사명</h5>
                    <input
                        type="text"
                        name="myCompany"
                        placeholder="회사 이름"
                        value={myCompanyInput}
                        onChange={(e) => setMyCompanyInput(e.target.value)}
                    />
                    <h5>작성자 이름 <span className={styles.req}>*</span></h5>
                    <input required
                           type="text"
                           name="myName"
                           placeholder="작성자 이름"
                           value={myNameInput}
                           onChange={(e) => setMyNameInput(e.target.value)}
                    />
                    <h5>수신자 회사명</h5>
                    <input
                        type="text"
                        name="reCompany"
                        placeholder="회사 이름"
                        value={reCompanyInput}
                        onChange={(e) => setReCompanyInput(e.target.value)}
                    />
                    <h5>수신자 이름 <span className={styles.req}>*</span></h5>
                    <input required
                           type="text"
                           name="reName"
                           placeholder="수신자 이름"
                           value={reNameInput}
                           onChange={(e) => setReNameInput(e.target.value)}
                    />
                    <h5>내용 <span className={styles.req}>*</span></h5>
                    <textarea
                        required
                        rows="20"
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
                    <div>
                        <input
                            type="checkbox"
                            checked={introInput}
                            name="intro"
                            onChange={(e) => setIntroInput(e.target.value)}/>인사말 추가
                    </div>
                    <input type="submit" value="영문 이메일 생성" />
                </form>
            </div>
            <div className="box">
                <h5>영문 이메일 결과</h5>
                <textarea
                    disabled
                    rows="48"
                    className={styles.result}
                    value={result}
                ></textarea>
            </div>
        </div>
    </Box>

)
