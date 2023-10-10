import { useState, useMemo } from 'react';

import { useSearchFilterModal } from '../../../recoil/modalState';
import {
  TargetEnterpriseEnum,
  PartCategoryEnum
} from '../../../policies/recommendation.policy';
import { locations } from '../../../policies/global.policy';
import { classNames } from '../../../utils';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from "@mui/material/Chip";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

interface SearchFilterUx {
  inputKeyword: (value: string) => void;
  clickSearchButton: () => void;
  openFilter: () => void;
  closeFilter: () => void;
  applyFilter: ({
    locationChoices,
    targetEnterpriseChoices,
    partChoices
  }: {
    locationChoices: string[];
    targetEnterpriseChoices: string[];
    partChoices: string[];
  }) => void;
}

export const SearchFilter: React.FC<SearchFilterUx> = (ux) => {
  const { searchFilterModal: open } = useSearchFilterModal();

  const [locationChoices, setLocationChoices] = useState<string[]>([]);
  const [targetEnterpriseChoices, setTargetEnterpriseChoices] = useState<string[]>([]);
  const [partChoices, setPartChoices] = useState<string[]>([]);

  const chipList = useMemo(() => {
    const locationChipItems = locationChoices.map((label) => {
      return {
        label,
        onDelete: () => {
          const filtered = locationChoices.filter((v) => v !== label);
          setLocationChoices(filtered);
          return {
            locationChoices: filtered,
            targetEnterpriseChoices,
            partChoices
          }
        }
      }
    });
    const targetEnterpriseChipItems = targetEnterpriseChoices.map((label) => {
      return {
        label,
        onDelete: () => {
          const filtered = targetEnterpriseChoices.filter((v) => v !== label);
          setTargetEnterpriseChoices(filtered);
          return {
            locationChoices,
            targetEnterpriseChoices: filtered,
            partChoices
          }
        }
      }
    });
    const partChoiceChipItems = partChoices.map((label) => {
      return {
        label,
        onDelete: () => {
          const filtered = partChoices.filter((v) => v !== label);
          setPartChoices(filtered);
          return {
            locationChoices,
            targetEnterpriseChoices,
            partChoices: filtered
          }
        }
      }
    });

    return [
      ...locationChipItems,
      ...targetEnterpriseChipItems,
      ...partChoiceChipItems
    ]
  }, [locationChoices, targetEnterpriseChoices, partChoices]);

  const getChoiceButtonSx = (isChoiced: boolean) => {
    return isChoiced ? {
      border: "none",
      bgcolor: "primary.main",
      color: "white",
      "&:hover": {
        bgcolor: "primary.main",
        color: "white",
        border: "none",
      }
    } : {
      borderColor: "grey.500",
      color: "grey.500",
      "&:hover": {
        bgcolor: "secondary.main",
        color: "white",
        border: "none",
      }
    }
  };

  const clearChoices = () => {
    setLocationChoices([]);
    setTargetEnterpriseChoices([]);
    setPartChoices([]);
  }

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const expandIconTransform = useMemo(() => isExpand ? "rotate(180deg)" : undefined, [isExpand]);

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어를 입력해주세요"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="button" sx={{}} aria-label="search" onClick={ux.openFilter}>
          <TuneIcon />
        </IconButton>
        <IconButton type="button" sx={{}} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className={classNames(
        'my-2',
        chipList.length > 0 ? undefined : "hidden"
      )}>
        <Typography variant={"overline"} component={"button"} sx={{ml: 1}} onClick={() => {
          clearChoices();
          ux.applyFilter({
            locationChoices: [],
            targetEnterpriseChoices: [],
            partChoices: []
          });
        }}>
          필터제거
        </Typography>
        <Collapse in={isExpand} collapsedSize={40}>
          <Grid container>
            <Grid item xs={chipList.length <= 4 ? 12 : 11} sx={{
              overflow: "scroll",
              boxShadow: !isExpand ? "inset -10px 0 5px -5px rgba(200, 200, 200, .2)" : undefined,
              "&::-webkit-scrollbar": {
                display: "none"
              }
            }}>
              {
                !isExpand ? (
                  <Stack height={"100%"} direction={"row"} spacing={1} alignItems={"center"}>
                    {
                      chipList.map((item) => (
                        <Chip label={item.label} onDelete={() => {
                          const filters = item.onDelete();
                          ux.applyFilter(filters);
                        }} key={item.label}/>
                      ))
                    }
                  </Stack>
                ) : (
                  <Grid container spacing={1}>
                    {
                      chipList.map((item) => (
                        <Grid item xs={"auto"} key={item.label}>
                          <Chip label={item.label} onDelete={() => {
                            const filters = item.onDelete();
                            ux.applyFilter(filters);
                          }}/>
                        </Grid>
                      ))
                    }
                  </Grid>
                )
              }
            </Grid>
            <Grid item xs={1} sx={{
              display: chipList.length <= 4 ? "none" : undefined
            }}>
              <IconButton onClick={() => setIsExpand(!isExpand)}>
                <ExpandMoreIcon sx={{
                  color: "grey.600"
                }} style={{
                  transform: expandIconTransform,
                  transition: "all ease 0.1s"
                }}/>
              </IconButton>
            </Grid>
          </Grid>
        </Collapse>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={() => {
          clearChoices();
          ux.closeFilter();
        }}
      >
        <DialogContent>
          <DialogActions sx={{ p: 0 }}>
            <IconButton onClick={() => {
              clearChoices();
              ux.closeFilter();
            }}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant={"h6"} component={"div"} color={"grey.700"}>
                지역검색 (중복검색 가능)
              </Typography>
              <Box height={200} sx={{
                overflow: "scroll"
              }}>
                <Grid container columns={12} spacing={1}>
                  {locations.map((value, index) => (
                    <Grid item xs={4} sm={3} key={index}>
                      <Button variant={"outlined"} sx={{
                        borderRadius: 0,
                        width: "100%",
                        ...getChoiceButtonSx(locationChoices.includes(value.sidoName))
                      }} onClick={() => {
                        if (locationChoices.includes(value.sidoName)) {
                          setLocationChoices(locationChoices.filter((v) => v !== value.sidoName));
                        } else {
                          setLocationChoices([...locationChoices, value.sidoName]);
                        }
                      }}>
                        {value.sidoName}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant={"h6"} component={"div"} color={"grey.700"}>
                대상기업 (중복검색 가능)
              </Typography>
              <Box height={100} sx={{
                overflow: "scroll"
              }}>
                <Grid container columns={12} spacing={1}>
                  {Object.values(TargetEnterpriseEnum).map((value, index) => (
                    <Grid item xs={4} sm={3} key={index}>
                      <Button variant={"outlined"} sx={{
                        borderRadius: 0,
                        width: "100%",
                        ...getChoiceButtonSx(targetEnterpriseChoices.includes(value))
                      }} onClick={() => {
                        if (targetEnterpriseChoices.includes(value)) {
                          setTargetEnterpriseChoices(targetEnterpriseChoices.filter((v) => v !== value));
                        } else {
                          setTargetEnterpriseChoices([...targetEnterpriseChoices, value]);
                        }
                      }}>
                        {value}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
            <Stack spacing={2}>
              <Typography variant={"h6"} component={"div"} color={"grey.700"}>
                분야 (중복검색 가능)
              </Typography>
              <Box height={150} sx={{
                overflow: "scroll"
              }}>
                <Grid container columns={12} spacing={1}>
                  {Object.values(PartCategoryEnum).map((value, index) => (
                    <Grid item xs={4} sm={3} key={index}>
                      <Button variant={"outlined"} sx={{
                        borderRadius: 0,
                        width: "100%",
                        ...getChoiceButtonSx(partChoices.includes(value))
                      }} onClick={() => {
                        if (partChoices.includes(value)) {
                          setPartChoices(partChoices.filter((v) => v !== value));
                        } else {
                          setPartChoices([...partChoices, value]);
                        }
                      }}>
                        {value}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Stack>
          <Box sx={{
            my: 3,
            display: "flex",
            justifyContent: "center"
          }}>
            <Button variant={"outlined"} sx={{px: 5}} onClick={() => {
              ux.applyFilter({
                locationChoices,
                targetEnterpriseChoices,
                partChoices
              });
              ux.closeFilter();
            }}>
              선택 조건 검색
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
