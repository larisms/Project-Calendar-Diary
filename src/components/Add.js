import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { addShow, detailShow } from "../redux/modules/show";


const Add = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState();
    const [content, setContent] = React.useState();
    const [color, setColor] = React.useState();

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
    console.log(post)


    const _addContent = () => {
        dispatch(detailActions.addContentMW(post))
        window.alert("저장완료");
        dispatch(detailShow(true));
        dispatch(addShow(false));
    }

    const _udtContent = (id, post) => {
        dispatchEvent(detailActions.udtContentMW(id, post))
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
                    onChange={changeTitle}
                    type="text"
                    placeholder="제목을 입력해주세요"
                ></input>
            </div>
            <div>
                <textarea
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
                <button onClick={_addContent}
                >저장하기</button>
                <button onClick={()=>{console.log(post)}}
                >저장하기</button>

            </div>

        </React.Fragment>
    )
}

const ColorButton = styled.button`
width:25px;
height:25px;
background-color: ${(props)=>props.color};
`

export default Add;