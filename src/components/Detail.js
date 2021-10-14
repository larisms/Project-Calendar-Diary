import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { addShow, detailShow } from "../redux/modules/show";
import { Input, Grid, Text, Button } from "../elements";


const Detail = (props) => {

    // const { date } = props;

    const history = useHistory();
    const dispatch = useDispatch();

    const post_list = useSelector((state) => state.detail.list);

    const nowDate = props.nowDate;
    console.log("날짜보기프롭스", props);
    console.log("클릭날짜", nowDate);

    // const post_id = props.match.params.id;
    console.log("프롭스", props);
    console.log("포스트아이디", post_list);
    console.log("디테일에포스트리스트", post_list);
    console.log(post_list.title);


    React.useEffect(() => {
        dispatch(detailActions.setContentMW());
    }, [dispatch]);

    const _delContent = (id) => {
        dispatch(detailActions.delContentMW(id));
    };

    const exitDetail = () => {
        dispatch(detailShow(false));
    };

    const goToAdd = () => {
        dispatch(detailShow(false))
        dispatch(addShow(true));
    };



    return (
        <React.Fragment>
            <p>{nowDate}</p>
            {post_list.map((p, idx) => {
                return (
                    <div>
                        <Text fontSize="15px">{p.title}</Text>
                        <Text fontSize="15px">{p.content}</Text>
                        {/* <button title={p.title} onClick={(e) => {
                            console.log("수정온클릭", e);
                        }}>수정</button> */}

                        <button onClick={() => {
                            dispatch(detailActions.editContent(p));
                            goToAdd();
                            console.log("피피피", p);
                            console.log("수정온클릭", p.title);
                        }}>수정</button>

                        <button key={p.id} onClick={() => {
                            const id = p.id;
                            _delContent(id)
                            console.log("맵포스트아이디", p.id)
                        }}>삭제</button>
                    </div>
                )
            })}

            <button onClick={goToAdd}>추가하기</button>
            <button onClick={exitDetail}>창닫기</button>
        </React.Fragment>
    )
};

export default Detail;
