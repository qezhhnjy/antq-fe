import {Col, Spin, Tag, Timeline} from "antd";
import React, {useEffect, useState} from "react";
import {ZIMA_BLUE} from "@/utils/common";
import EditCard from "@/components/EditCard";
import SaveCard from "@/components/SaveCard";
import {listRecord} from "@/services/ant-design-pro/antq-api";

const {Item} = Timeline;

export const TimelineRefreshContext = React.createContext<any>({});

const TimelineRecord: React.FC<any> = (props) => {
  const {} = props;
  const [records, setRecords] = useState<API.TimelineRecord[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      listRecord()
        .then(result => setRecords(result?.data || []))
        .then(() => setLoading(false))
        .then(() => setRefresh(false));
    }
  }, [refresh]);

  return (
    <TimelineRefreshContext.Provider value={{refresh, setRefresh}}>
      {loading ? <Spin size='large'/> :
        <Timeline mode='left' reverse={true} style={{width: '75%'}}>
          {
            records?.map(record => (<Item key={record.id} label={<Tag color={ZIMA_BLUE}>{record.recordTime}</Tag>}>
              <Col span={20}>
                <EditCard record={record}/>
              </Col>
            </Item>))
          }
          <Item>
            <SaveCard/>
          </Item>
        </Timeline>
      }
    </TimelineRefreshContext.Provider>
  )
}
export default TimelineRecord;
