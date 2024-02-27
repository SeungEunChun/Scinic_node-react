const express = require("express");
const mysql = require("mysql");
const mydbinfo = require("../data/dbconfig.json")

const formtag = express.Router();

//데이터 온것을 json으로 처리
formtag.use(express.json())

//주소창에서 데이터를 읽어들이기 위함
formtag.use(express.urlencoded({ extended: true }))


//DB 접속 정보를 토대로 createPool 메소드 실행
const myconnection = mysql.createPool(mydbinfo);


//글쓰기
//리액트 요청주소형태 :  서버/form/테이블 이름
//성공반환결과 : msg의 값은 i
formtag.post('/:tablenm', (req, res) => {
    const tablenm = req.params.tablenm;

    //모든 폼태그의 필드와 값을 정리 (req.body.body object를 세분화하기)
    const columns = Object.keys(req.body.body).join(',');

    //폼태그 이름을 필드값과 동일하게 배열
    const values = Object.values(req.body.body).map(value => `'${value}'`).join(',');
    //필드의 value값들을 모두 문자열로 변경 -> 하나의 string으로 반환



    // const wheretable = p_id !== "" ? ` where p_id =${p_id}` : null
    myconnection.getConnection((err, connect) => {
        if (err) throw console.log("db오류" + err)
        connect.query(`INSERT INTO ${tablenm} (${columns})
        VALUES (${values})`, (error, result) => {
            if (error) throw console.log("쿼리문오류" + error);
            res.send({ msg: "i" })  //i가 오면 insert구문 성공
            console.log(result);
            connect.release();
        })
    })
})

//글수정   
//리액트 요청주소형태 :  서버/store/테이블/숫자(pk)/m과 폼데이터json
//성공반환결과 : msg의 값은 m
formtag.post('/:tablenm/:id/m', (req, res) => {
    const tablenm = req.params.tablenm;
    const pk = req.params.id;


    const setClause = Object.keys(req.body.body).map(key => `${key} = '${bodyData[key]}'`).join(', ');



    myconnection.getConnection((err, connect) => {
        if (err) throw console.log("DB접속정보확인 " + err)
        connect.query(`UPDATE ${tablenm} SET  ${setClause} WHERE id = ${pk}`, (error, result) => {
            if (error) throw console.log("글수정 혹은 글삽입 쿼리문 오류")
            res.send({ msg: "m" })
            connect.release(); // 연결 해제
        })

    })
})


//글삭제
//리액트 요청주소형태 :  서버/store/테이블/숫자(pk)/d과 폼데이터json
formtag.post('/:tablenm/:id/d', (req, res) => {
    const tablenm = req.params.tablenm
    const pk = req.params.id;
    myconnection.getConnection((err, connect) => {
        if (err) throw console.log("DB접속정보확인 " + err)
        connect.query(`DELETE FROM ${tablenm} WHERE id = ${pk}`, (error, result) => {
            if (error) throw console.log("쿼리문 오류")
            res.send({ msg: "d" })
            connect.release(); // 연결 해제
        })
    })
})
























module.exports = formtag;