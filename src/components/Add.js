import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { actionCreators as detailActions } from "../redux/modules/detail";

const Add = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState();
    const [content, setContent] = React.useState();

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const post = {
        title: title,
        content: content,
    }
    console.log(post)


    const _addContent = () => {
        dispatch(detailActions.addContent(post))
    }



    return (
        <React.Fragment>
            날짜
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
                <button>red</button>
                <button>orange</button>
                <button>yellow</button>
                <button>green</button>
                <button>blue</button>
                <button>purple</button>
            </div>
            <div>
                <button onClick={() => {
                    _addContent();
                    window.alert("저장완료");
                    history.push("/detail");
                }}
                >저장하기</button>
            </div>

        </React.Fragment>
    )
}

export default Add;