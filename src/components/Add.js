import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { addShow, detailShow } from "../redux/modules/show";


const Add = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();


    const editPost = useSelector((state) => {
        console.log(state.detail)
        return state.detail.editList
    });
    const is_edit = editPost.id ? true : false;
    // console.log("편집데이터가져오기", editPost);
    // console.log("이즈에딧확인하기", is_edit);

    
    const [title, setTitle] = React.useState(is_edit ? editPost.title : "");
    const [content, setContent] = React.useState(is_edit ? editPost.content : "");
    const [color, setColor] = React.useState(is_edit ? editPost.color : "");
    // const [editTitle, setEditTitle] = React.useState(is_edit? editPost.title : "");
    // const [editContent, setEditContent] = React.useState(is_edit? editPost.content : "");

    const nowDate = props.nowDate;

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const post = {
        date: nowDate,
        title: title,
        content: content,
        color: color,
    }


    const _addContent = () => {
        dispatch(detailActions.addContentMW(post))
        window.alert("저장완료");
        dispatch(detailShow(true));
        dispatch(addShow(false));
    }

    const _udtContent = () => {
        const id = editPost.id
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
    }

    return (
        <React.Fragment>
            <p>{nowDate}</p>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    type="text"
                    placeholder="제목을 입력해주세요"
                ></input>
            </div>
            <div>
                <textarea
                    value={content}
                    onChange={changeContent}
                    type="text"
                    placeholder="내용을 입력해주세요"
                ></textarea>
            </div>
            <div>
                <ColorButton color="#DD6262" onClick={clickColor}></ColorButton>
                <ColorButton color="#B07255" onClick={clickColor}></ColorButton>
                <ColorButton color="#6C9D68" onClick={clickColor}></ColorButton>
                <ColorButton color="#6A96B8" onClick={clickColor}></ColorButton>
                <ColorButton color="#818D90" onClick={clickColor}></ColorButton>
                <ColorButton color="#9F70BC" onClick={clickColor}></ColorButton>
            </div>
            <div>
                {is_edit ? (
                    <button onClick={_udtContent}>수정하기</button>
                ) : (
                    <button onClick={_addContent}>저장하기</button>
                )}
            </div>

        </React.Fragment>
    )
}

const ColorButton = styled.button`
width:25px;
height:25px;
background-color: ${(props) => props.color};
`

export default Add;