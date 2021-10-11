import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


const Detail = (props) => {

    const history = useHistory();
    const post_list = useSelector((state) => state.detail.list);
    // console.log(post_list)
    // console.log(post_list.title)

    return (
        <React.Fragment>
            날짜
            {post_list.map((p, idx) => {
                return (
                    <div>
                        <p>{p.title}</p>
                        <p>{p.content}</p>
                        <button onClick={() => {
                            history.replace("/add")
                        }}>수정</button>
                        <button>삭제</button>
                    </div>
                )
            })}

            <button onClick={() => {
                history.replace("/add")
            }}>추가하기</button>
        </React.Fragment>
    )
}

export default Detail;