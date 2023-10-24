import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isEqual } from "lodash";

import { ProfileMutation$data } from "../../../recoil/app/ProfileMutation";
import { CompanyTypeEnum } from "../../../policies/company.policy";
import { locations } from "../../../policies/global.policy";
import { interestTags } from "../../../policies/recommendation.policy";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { useProfileContext } from "../../../context/profile.context";

interface ProfileFormUx {
  update: (form: ProfileMutation$data) => void;
}

const ProfileForm: React.FC<ProfileFormUx> = (ux) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const {contents: profile} = useProfileContext();

  const [form, setForm] = useState<ProfileMutation$data | undefined>(undefined);

  useEffect(() => {
    if (!profile) return;
    setForm(profile);
  }, [profile]);

  if (!form) return <></>;
  return (
    <Box sx={{width: "100%", mb: 12}}>
      <Stack spacing={2} sx={{
        px: md ? 10 : 0
      }}>
        <Stack spacing={2} sx={{py: 2}}>
          <Typography variant={"h6"} component={"h2"} sx={{
            fontWeight: "bold",
            color: "grey.700"
          }}>
            기업 추가정보 변경
          </Typography>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            <div className="flex flex-row space-x-2">
              <span>※</span>
              <span>
                추가정보 입력 시, 입력하신 정보를 바탕으로 맞춤형 고용정책 추천 서비스 및 인력 관리 서비스를 보다 간편하게 이용하실 수 있습니다.
              </span>
            </div>
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            기업형태
          </Typography>
          <Box maxHeight={100} sx={{
            overflowY: "scroll"
          }}>
            <Grid container spacing={1}>
              {
                Object.values(CompanyTypeEnum).map((text) => (
                  <Grid item>
                    <Button fullWidth variant={form.companyType === text ? "contained" : "outlined"}
                      onClick={() => {
                        if (!(form.companyType === text)) {
                          setForm({
                            ...form,
                            companyType: text
                          });
                        }
                      }}
                    >
                      {text}
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            기업소재지
          </Typography>
          <Box maxHeight={120} sx={{
            overflowY: "scroll"
          }}>
            <Grid container spacing={1}>
              {
                locations.map((location) => (
                  <Grid item>
                    <Button fullWidth variant={form.companyAddress === location.name ? "contained" : "outlined"}
                      onClick={() => {
                        if (!(form.companyAddress === location.name)) {
                          setForm({
                            ...form,
                            companyAddress: location.name
                          });
                        }
                      }}
                    >
                      {location.name}
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            종업원 수
          </Typography>
          <div className="flex flex-row items-center space-x-2">
            <TextField size="small" type={"number"} sx={{width: 240}} value={form.employCount}
              onChange={(e) => {
                setForm({
                  ...form,
                  employCount: parseInt(e.target.value)
                });
              }}
            />
            <span>명</span>
          </div>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            추가 관심 키워드
          </Typography>
          <Box maxHeight={120} sx={{
            overflowY: "scroll"
          }}>
            <Grid container spacing={1}>
              {
                interestTags.map((v) => (
                  <Grid item>
                    <Button fullWidth variant={form.interestKeywords.includes(v.keyword) ? "contained" : "outlined"}
                      onClick={() => {
                        const interestKeywords = form.interestKeywords;
                        const keyword = v.keyword;
                        if (interestKeywords.includes(keyword)) {
                          setForm({
                            ...form,
                            interestKeywords: interestKeywords.filter((v) => v !== keyword)
                          });
                        }
                        else {
                          setForm({
                            ...form,
                            interestKeywords: [...interestKeywords, keyword]
                          });
                        }
                      }}
                    >
                      {v.keyword}
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{my: 4}} />
      <Stack spacing={2} sx={{
        px: md ? 10 : 0
      }}>
        <Stack spacing={2} sx={{py: 2}}>
          <Typography variant={"h6"} component={"h2"} sx={{
            fontWeight: "bold",
            color: "grey.700"
          }}>
            서비스 수신동의 (선택)
          </Typography>
          <Typography variant={"body2"} sx={{
            color: "grey.600"
          }}>
            <div className="flex flex-row space-x-2">
              <span>※</span>
              <span>
                고용정책검색서비스에서 제공하는 유용한 서비스에 대해 추가적으로 필요한 동의를 진행합니다.
              </span>
            </div>
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body1"} sx={{
            fontWeight: "bold",
            color: "grey.700"
          }}>
            SMS 수신 동의
          </Typography>
          <div className="flex flex-row items-center space-x-1">
            <ToggleButton
              value={"check"}
              selected={form.agreeMarketingSMS}
              onChange={() => setForm({
                ...form,
                agreeMarketingSMS: !form.agreeMarketingSMS
              })}
              sx={{
                p: 0.5,
                '&.Mui-selected': {
                  bgcolor: "primary.main",
                  color: "primary.contrastText"
                }
              }}
            >
              <CheckIcon sx={{fontSize: 12}} />
            </ToggleButton>
            <Typography variant={"caption"}>
              본인인증, 관심 고용정책 등록 시 알림 서비스에 대해 고객님의 휴대전화로 SNS 알림을 보내는 것에 대한 동의입니다.
            </Typography>
          </div>
        </Stack>
        <Stack spacing={1}>
          <Typography variant={"body1"} sx={{
            fontWeight: "bold",
            color: "grey.700"
          }}>
            메일 수신 동의
          </Typography>
          <div className="flex flex-row items-center space-x-1">
            <ToggleButton
              value={"check"}
              selected={form.agreeMarketingMail}
              onChange={() => setForm({
                ...form,
                agreeMarketingMail: !form.agreeMarketingMail
              })}
              sx={{
                p: 0.5,
                '&.Mui-selected': {
                  bgcolor: "primary.main",
                  color: "primary.contrastText"
                }
              }}
            >
              <CheckIcon sx={{fontSize: 12}} />
            </ToggleButton>
            <Typography variant={"caption"}>
              관심 고용정책 등록 시 알림 서비스, 각종 유용한 정보를 메일을 통해 수신 받을 것인지에 대한 동의입니다.
            </Typography>
          </div>
        </Stack>
      </Stack>
      <div className="w-full flex justify-center mt-16">
        <Button disabled={isEqual(form, profile)} variant={"contained"} color="secondary"
          onClick={() => {
            const agree = window.confirm("계정 정보를 업데이트 하시겠습니까?");
            if (agree) ux.update(form);
          }}
        >계정 정보 업데이트</Button>
      </div>
    </Box>
  );
}

export default ProfileForm;
