import { NotionAPI } from 'notion-client';
import express from 'express';
import cors from 'cors';
import http from 'http';
// const express = require('express');
// const cors = require('cors');
const app = express();
const server = http.createServer(app);
// const {NotionAPI} = require('notion-client');

const api = new NotionAPI();

// CORS 사용
app.use(cors());

// API로 요청한 경우 hello 메시지를 보내는 콜백 함수를 넣습니다.
app.get('/api/proxy/notion/page/:pageId', (req,res) => {
    getData(req.params.pageId).then(
        (response) => {
            const responseBody = {
                code: 'SU',
                message: 'SUCCESS',
                resultJsonText: response
            };
            res.send(responseBody);
        }
    );
});

async function getData(pageId) {
    const page = await api.getPage(pageId);
    return page;
}

// 서버가 잘 동작하고 있는지 확인
server.listen(9090, ()=>{
    console.log('server is running on 9090');
});