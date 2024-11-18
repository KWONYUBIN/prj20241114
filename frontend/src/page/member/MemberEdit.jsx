import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Group, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";

export function MemberEdit() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [description, setDescription] = useState("");
  const [emailCheck, setEmailCheck] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/member/${id}`).then((res) => {
      setMember(res.data);
      setPassword(res.data.password);
      setDescription(res.data.description);
      setEmail(res.data.email);
    });
  }, []);

  function handleSaveClick() {
    axios
      .put("/api/member/update", {
        id: member.id,
        email: email.length === 0 ? null : email,
        password,
        description,
        oldPassword,
      })
      .then((res) => {
        const message = res.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate(`/member/${id}`);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setOpen(false);
        setOldPassword("");
      });
  }

  const handleEmailCheckClick = () => {
    axios
      .get("/api/member/check", {
        params: {
          email,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        setEmailCheck(data.available);
      });
  };

  let emailCheckButtonDisabled = true;

  if (email.length === 0 || member.email === email) {
    // 이메일을 안쓰거나 기존과 같으면 true
  } else {
    // 그렇지 않으면 false
    emailCheckButtonDisabled = false;
  }

  // 저장버튼 활성화 여부
  let saveButtonDisabled = false;
  if (!emailCheck) {
    saveButtonDisabled = true;
  }

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h3>회원 정보</h3>
      <Stack gap={5}>
        <Field readOnly label={"아이디"}>
          <Input defaultValue={member.id} />
        </Field>
        <Field label={"이메일"}>
          <Group attached w={"100%"}>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                const emptyEmail = e.target.value.length === 0;
                const sameEmail = e.target.value === member.email;
                if (emptyEmail || sameEmail) {
                  setEmailCheck(true);
                } else {
                  setEmailCheck(false);
                }
              }}
            />
            <Button
              variant={"outline"}
              onClick={handleEmailCheckClick}
              disabled={emailCheckButtonDisabled}
            >
              중복확인
            </Button>
          </Group>
        </Field>
        <Field label={"암호"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label={"자기소개"}>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <Box>
          <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
              <Button disabled={saveButtonDisabled} colorPalette={"blue"}>
                저장
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>회원 정보 변경 확인</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={5}>
                  <Field label={"기존 암호"}>
                    <Input
                      placeholder={"기존 암호를 입력해주세요."}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Field>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger>
                  <Button variant={"outline"}>취소</Button>
                </DialogActionTrigger>
                <Button colorPalette={"blue"} onClick={handleSaveClick}>
                  저장
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </Box>
      </Stack>
    </Box>
  );
}
