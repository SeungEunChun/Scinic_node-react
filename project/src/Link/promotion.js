import React, { useState } from 'react';
import axios from 'axios';

function Form() {

    const productApi = async (myName, data = null) => {
        try {
            if (data) {

                const response = await axios.post(`/form/${myName}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: data
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // const responseData = await response.json(); // Assuming the response is JSON, adjust as necessary
                // return responseData;
                console.log(response)
                return response;

            } else {
                return axios.get(`/store/${myName}`);
            }

        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const [formData, setFormData] = useState({  //input의 name이 곧 변수
        u_name: '',
        u_phone: '',
        u_email: '',
        marketing: null
    });

    const handleChange = (e) => {
        // 데이터삽입
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const buttonClick = async (e) => { //전송버튼 비동기 이벤트
        e.preventDefault();
        console.log("전송요청함")

        try {
            // productApi 호출
            console.log("리엑트 formData>>>>>", formData);
            ////////////////////////////////////

            const response = await productApi('myform', formData);
            // 서버 응답 확인
            console.log('서버 응답:', response);

            // 성공적으로 처리된 경우 추가 로직 작성

        } catch (error) {
            console.error('서버 요청 오류:', error);
        }

    }

    return (
        <div className='text-center'>
            <form className='myForm' onSubmit={(e) => { buttonClick(e) }} style={{ marginTop: "20%" }}>
                <div className='mb-4'>
                    <h5 className=''>싸이닉 제품 체험단을 모집합니다!</h5>
                    <div>
                        <div className='mb-4'>
                            <label className='' htmlFor="username">이름</label><br />
                            <input
                                type="text"
                                name='u_name'
                                id='username'
                                className='formtag'
                                placeholder='홍길동'
                                value={formData.u_name}
                                onChange={handleChange}
                            />

                        </div>
                        <div className='mb-4'>
                            <label className='' htmlFor="userphone">휴대전화번호</label><br />
                            <input
                                type="number"
                                name='u_phone'
                                id='userphone'
                                className='formtag'
                                placeholder='01012346789'
                                value={formData.u_phone}
                                onChange={handleChange}


                            />

                        </div>
                        <div className='mb-4'>
                            <label className='' htmlFor="useremail">이메일</label><br />
                            <input
                                type="text"
                                name='u_email'
                                id='useremail'
                                className='formtag'
                                placeholder='aaa@naver.com'

                                value={formData.u_email}
                                onChange={handleChange}
                            />

                        </div>
                    </div>

                    <div className=''>
                        <div className='mb-4'>
                            <input
                                type="checkbox"
                                name="information"
                                id="information"
                            // checked={Essential}
                            // onClick={() => {
                            //     setEssential(!Essential)
                            // }}
                            />
                            <label htmlFor="information">개인정보수집동의</label>
                        </div>
                        <div className='mb-4'>
                            <input
                                type="checkbox"
                                name="marketing"
                                id="marketing"
                                value={formData.marketing}
                                onChange={handleChange}
                            />
                            <label htmlFor="marketing">마케팅수신정보동의 </label>
                            <span className='choice'>(선택)</span>
                        </div>
                    </div>

                    <button
                        className='btn-4'
                        type="submit"
                    >
                        <span>신청하기</span></button>
                </div>
            </form>
        </div>

    )
}

export default Form