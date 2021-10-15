import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { actionCreators as detailActions } from "../redux/modules/detail";
import { actionCreators as editActions } from "../redux/modules/calendar";
import { addShow, detailShow } from "../redux/modules/show";
import { Input, Grid, Text, Button } from "../elements";


const Detail = (props) => {

    // const { date } = props;

    const history = useHistory();
    const dispatch = useDispatch();

    const post_list = useSelector((state) => state.detail.list);
    const scrollRef = React.useRef()

    const date = props.date;
    console.log("날짜보기프롭스", props);
    console.log("클릭날짜", date);
    console.log("디테일에포스트리스트", post_list);


    React.useEffect(() => {
        dispatch(detailActions.setContentMW(date));
    }, []);

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
            <ModalBG>
                <DiaryHead>
                    <DiaryDate >{date}</DiaryDate>
                    <CloseBtn onClick={exitDetail}>+</CloseBtn>
                </DiaryHead>
                <Wrap>
                    <p ref={scrollRef} />
                    {post_list.map((p, idx) => {
                        return (
                            <DiaryCard>
                                <ColorNTitle>
                                    <ColorCircle color={p.color} />
                                    <Title>{p.title}</Title>
                                </ColorNTitle>
                                <Contents>{p.content}</Contents>
                                <EditDelBtnDiv>
                                    <EditBtn onClick={() => {
                                        dispatch(detailActions.editContent(p));
                                        goToAdd();
                                        console.log("수정온클릭 피피피", p);
                                        console.log("수정온클릭 피 아이디", p._id);
                                    }}>수정</EditBtn>

                                    <EditBtn key={p._id} onClick={() => {
                                        const id = p._id;
                                        _delContent(id)
                                        console.log("맵포스트아이디", p._id)
                                    }}>삭제</EditBtn>
                                </EditDelBtnDiv>
                            </DiaryCard>
                        )
                    })}
                    <TopBtnDiv>
                        <ToTopBtn onClick={() => {
                            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });;
                        }}>top</ToTopBtn>
                    </TopBtnDiv>
                    <AddBtn onClick={goToAdd}>추가</AddBtn>
                </Wrap>
            </ModalBG>
        </React.Fragment >
    )
};


const DiaryHead = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 5px 0px;
`;

const DiaryDate = styled.p`
font-family: 'Song Myung', serif;
color: #655f5b;
font-weight: 600;
font-size: 20px;
white-space: pre-wrap;
`;

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

`;

const Wrap = styled.div`
height: 100%;
width: 100%;
padding: 14px;
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

const CloseBtn = styled.button`
width: 40px;
height: 40px;
margin: 0px 0px 0px 3px;
font-family: 'Roboto', sans-serif;
font-size: 40px;
letter-spacing: 2px;
font-weight: 500;
color: #655f5b;
background-color: #ffffff00;
border: none;
border-radius: 5px;
// box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
transform: rotate(45deg);
cursor: pointer;
outline: none;

&:hover {
    
    // box-shadow: 0px 15px 20px #e0e0e0;
    color: #ffac65;
  }
`;

const DiaryCard = styled.div`
border: 1px solid #e0c9b6;
margin: 10px auto;
padding: 15px;
width: 80%;
border-radius: 10px;
background-color: #ffffff; 
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);

`;

const ColorNTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
margin: 5px 0px;
`;

const ColorCircle = styled.div`
border: none;
width: 20px;
height: 20px;
margin: 0px 5px 0px 0px;
border-radius: 100px;
background-color: ${props => props.color};
`;

const Title = styled.p`
font-family: 'Nanum Myeongjo', serif;
// letter-spacing: 1px;
font-weight: 600;
font-size: 15px;
`;

const Contents = styled.p`
font-family: 'Nanum Myeongjo', serif;
font-weight: 300;
font-size: 13px;
margin: 10px 0;
line-height: 18px;
white-space: pre-wrap;
`;

const EditDelBtnDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
margin: 5px 3px;
`;

const EditBtn = styled.button`
width: 50px;
height: 20px;
margin: 0px 0px 0px 3px;
font-family: 'Roboto', sans-serif;
font-size: 11px;
letter-spacing: 2px;
font-weight: 500;
color: #655f5b;
background-color: #ffffff;
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

const AddBtn = styled.button`
width: 40px;
height: 40px;
background-color: #efc19b;
color: #ffffff;
box-sizing: border-box;
font-family: 'Roboto', sans-serif;
font-size: 12px;
font-weight: 400;
position: fixed;
bottom: 50px;
right: 21px;
text-align: center;
vertical-align: middle;
border: 1px solid white;
border-radius: 10px;
box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
cursor: pointer;
outline: none;

&:hover {
    background-color: #ffecdc;
    box-shadow: 0px 15px 20px #e0e0e0;
    border: 1px solid #ffecdc;
    color: #655f5b;
  }
`;

const TopBtnDiv = styled.div`
width: 300px;
margin: auto;
display: flex; 
flex-direction: column; 
`;

const ToTopBtn = styled.button`
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


export default Detail;
