import React from "react";

const Detail = (props) => {

    return (
        <React.Fragment>
            날짜
            <div>
                <div>
                    <p>post1</p>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <div>
                    <p>post2</p>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <div>
                    <p>post3</p>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>
            <button>추가하기</button>
        </React.Fragment>
    )
}

export default Detail;