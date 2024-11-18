import { Box, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 회원목록 요청
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  // 테이블 행 클릭시 회원정보보기로 이동
  function handleRowClick(id) {
    navigate(`/member/${id}`);
  }

  if (!memberList || memberList.length === 0) {
    return <Spinner />;
  }

  return (
    <Box>
      <h3>회원 목록</h3>

      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>가입일시</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.map((member) => (
            <Table.Row
              onClick={() => handleRowClick(member.id)}
              key={member.id}
            >
              <Table.Cell>{member.id}</Table.Cell>
              <Table.Cell>{member.inserted}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
