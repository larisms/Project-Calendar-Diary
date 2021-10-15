import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { addShow, detailShow } from "../redux/modules/show";
import { Input, Grid, Text, Button } from "../elements";


const Add = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();


    const editPost = useSelector((state) => {
        console.log(state.detail)
        return state.detail.editList
    });
    const is_edit = editPost._id ? true : false;
    // console.log("편집데이터가져오기", editPost);
    // console.log("이즈에딧확인하기", is_edit);


    const [title, setTitle] = React.useState(is_edit ? editPost.title : "");
    const [content, setContent] = React.useState(is_edit ? editPost.content : "");
    const [color, setColor] = React.useState(is_edit ? editPost.color : "#DD6262");
    // const [editTitle, setEditTitle] = React.useState(is_edit? editPost.title : "");
    // const [editContent, setEditContent] = React.useState(is_edit? editPost.content : "");

    const date = props.date;
    
    const post = {
        date: date,
        title: title,
        content: content,
        color: color,
    }

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const addClass = (e) => {
        const siblings = t => [...t.parentElement.children].filter(e => e !== t);
        siblings(e.target).map((x)=>{
            const class_ = String(x.classList[0]+" "+x.classList[1])
            if(x.classList[2] === "on"){
                x.setAttribute('class',class_)
            }
        });
        e.target.classList.add("on");
        
    }


    const _addContent = () => {
        dispatch(detailActions.addContentMW(post))
        window.alert("저장완료");
        dispatch(detailShow(true));
        dispatch(addShow(false));
    }

    const _udtContent = () => {
        const id = editPost._id
        console.log("업데이트넘겨주는포스트", post)
        console.log("업데이트넘겨주는아이디", id)
        dispatch(detailActions.udtContentMW(id, post))
        window.alert("수정완료");
        dispatch(detailShow(true));
        dispatch(addShow(false));
        dispatch(detailActions.delEdit(id, post))
    }

    const clickColor = (e) => {
        const color = e.target.attributes.color.value
        setColor(color)
        addClass(e)
    }

    return (
        <React.Fragment>
            <ModalBG>
                <DiaryDate fontSize="20px">{date}</DiaryDate>
                <InputDiv>
                <ColorBtnDiv>
                    <ColorBtn color="#DD6262" onClick={clickColor}></ColorBtn>
                    <ColorBtn color="#B07255" onClick={clickColor}></ColorBtn>
                    <ColorBtn color="#6C9D68" onClick={clickColor}></ColorBtn>
                    <ColorBtn color="#6A96B8" onClick={clickColor}></ColorBtn>
                    <ColorBtn color="#818D90" onClick={clickColor}></ColorBtn>
                    <ColorBtn color="#9F70BC" onClick={clickColor}></ColorBtn>
                </ColorBtnDiv>
                    <SubText>Title</SubText>
                    <TitleInput
                        value={title}
                        onChange={changeTitle}
                        type="text"
                        placeholder="제목을 입력해주세요"
                    ></TitleInput>
                    <SubText>Content</SubText>
                    <ContentInput
                        value={content}
                        onChange={changeContent}
                        type="text"
                        placeholder="내용을 입력해주세요"
                    ></ContentInput>
                </InputDiv>
                
                <div>
                    {is_edit ? (
                        <AddBtn onClick={_udtContent}>수정하기</AddBtn>
                    ) : (
                        <AddBtn onClick={_addContent}>저장하기</AddBtn>
                    )}
                </div>
            </ModalBG>
        </React.Fragment>
    )
}

const ModalBG = styled.div` 
position: fixed; 
top: 50%; 
left: 50%; 
width: 80vw; 
max-width: 700px; 
height: 80vh; 
padding: 20px; 
background-color: #fffaf6; 
z-index: 40; 
transform: translate(-50%, -50%); 
display: flex; 
flex-direction: column; 
justify-content: space-between; 
align-items: center; 
border-radius: 10px; 
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
overflow-x: hidden;
overflow-y: auto;

&::-webkit-scrollbar {
    width: 6px;
    background: none;
}

&::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    opacity: .4;
    border-radius: 10px;
}

&::-webkit-scrollbar-track {
    background: none;
} 
`;

const DiaryDate = styled.p`
font-family: 'Song Myung', serif;
color: #655f5b;
font-weight: 600;
font-size: 20px;
white-space: pre-wrap;
`;

const InputDiv = styled.div`
width: 80%;
height: 40%;
display: flex;
flex-direction: column; 
overflow: hidden;
`;

const SubText = styled.p`
font-family: 'Nanum Myeongjo', serif;
letter-spacing: 1px;
font-weight: 600;
font-size: 15px;
`;

const TitleInput = styled.input`
font-family: 'Nanum Myeongjo', serif;
border: 1px solid #e0c9b6;
margin: 10px auto 10% auto;
padding: 10px 10px;
width: 98%;
border-radius: 10px;
background-color: #ffffff; 
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
word-break: break-word;
&: focus {
    outline: none;
    box-shadow: 0 0 0px 2px #efc19b; 
}
`;

const ContentInput = styled.textarea`
font-family: 'Nanum Myeongjo', serif;
border: 1px solid #e0c9b6;
margin: 10px auto;
padding: 10px;
width: 98%;
height: 60%;
border-radius: 10px;
background-color: #ffffff; 
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
resize: none;
box-sizing: border-box;
overflow: hidden;
word-break: break-word;
&: focus {
    outline: none;
    box-shadow: 0 0 0px 2px #efc19b; 
}
`;

const ColorBtnDiv =styled.div`
margin: auto;
display: flex;
flex-direction: row;
justify-content: center;

`;

const ColorBtn = styled.button`
width:25px;
height:25px;
border-radius: 100px;
border: none;
opacity: 0.5;
margin-right: 10px;
cursor: pointer;
  &.on {
    opacity: 1;
  }
  &:hover{
    opacity: 1;
  }
  @media only screen and (max-width: 680px) {
    width: 20px;
    height: 20px;
  }
background-color: ${(props) => props.color};
`;

const AddBtn = styled.button`
display: block;
margin: auto;
width: 100px;
height: 30px;
font-family: 'Roboto', sans-serif;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 2px;
font-weight: 500;
color: #655f5b;
background-color: #fff;
border: none;
border-radius: 5px;
box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
cursor: pointer;
outline: none;

&:hover {
    background-color: #efc19b;
    box-shadow: 0px 15px 20px #e0e0e0;
    color: #fff;
  }
`;



export default Add;