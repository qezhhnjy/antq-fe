import {PageContainer} from '@ant-design/pro-layout';
import React, {useState} from 'react';
import {Divider, Menu} from 'antd';
import StockTable from '@/components/snowball/StockTable';
import ConvertibleBondTable from '@/components/snowball/ConvertibleBondTable';

const {SubMenu} = Menu;

const QuoteCenter: React.FC<any> = (props) => {
  const {} = props;
  const [stock, setStock] = useState<Snowball.QuoteListQuery | undefined>({
    market: 'CN',
    type: 'sh_sz',
    order_by: 'market_capital',
    order: 'desc',
  });
  const [title, setTitle] = useState<string>('沪深股');
  const [bond, setBond] = useState<Snowball.QuoteListQuery | undefined>(undefined);

  const showInfo = (v: any) => {
    setTitle(v.key);
    // todo 存在切换到可转债order信息丢失的bug
    setStock({order_by: 'market_capital', order: 'desc',});
    setBond(undefined);
    switch (v.key) {
      case '沪深股':
        setStock({...stock, market: 'CN', type: 'sh_sz',});
        break;
      case '科创板':
        setStock({...stock, market: 'CN', type: 'kcb', exchange: 'CN'});
        break;
      case '港股':
        setStock({...stock, market: 'HK', type: 'hk'});
        break;
      case '美股':
        setStock({...stock, market: 'US', type: 'us'});
        break;
      case '明星股':
        setStock({...stock, market: 'US', type: 'us_star'});
        break;
      case '中概股':
        setStock({...stock, market: 'US', type: 'us_china'});
        break;
      case '可转债':
        setBond({
          exchange: 'CN',
          market: 'CN',
          industry: '可转债',
          type: 'convert',
          order_by: 'percent',
        });
        break;
      default:
        setTitle('-');
    }
  };
  return (
    <PageContainer>
      <Menu
        style={{width: '100%'}}
        mode="horizontal"
        theme="light"
        inlineIndent={12}
        onSelect={(v) => showInfo(v)}
      >
        <SubMenu key="sub1" title={<b>沪深股市</b>}>
          <Menu.Item key="沪深股">沪深股</Menu.Item>
          <Menu.Item key="科创板">科创板</Menu.Item>
          <Divider/>
          <Menu.Item key="新股上市">新股上市</Menu.Item>
          <Menu.Item key="龙虎榜">龙虎榜</Menu.Item>
          <Menu.Item key="AH股溢价">AH股溢价</Menu.Item>
          <Menu.Item key="内部交易">内部交易</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<b>香港股市</b>}>
          <Menu.Item key="港股">港股</Menu.Item>
          <Divider/>
          <Menu.Item key="恒生行业">恒生行业</Menu.Item>
          <Menu.Item key="新股上市">新股上市</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<b>美国股市</b>}>
          <Menu.Item key="美股">美股</Menu.Item>
          <Menu.Item key="明星股">明星股</Menu.Item>
          <Menu.Item key="中概股">中概股</Menu.Item>
          <Divider/>
          <Menu.Item key="上市预告">上市预告</Menu.Item>
          <Menu.Item key="新上市公司">新上市公司</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<b>债券及回购</b>}>
          <Menu.Item key="可转债">可转债</Menu.Item>
          <Divider/>
          <Menu.Item key="国债">国债</Menu.Item>
          <Menu.Item key="企债">企债</Menu.Item>
          <Menu.Item key="回购">回购</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title={<b>基金</b>}>
          <Menu.Item key="分级基金">分级基金</Menu.Item>
          <Menu.Item key="货币型">货币型</Menu.Item>
          <Menu.Item key="股票型">股票型</Menu.Item>
          <Menu.Item key="债券型">债券型</Menu.Item>
          <Menu.Item key="混合型">混合型</Menu.Item>
          <Menu.Item key="QDII基金">QDII基金</Menu.Item>
          <Menu.Item key="指数型基金">指数型基金</Menu.Item>
          <Menu.Item key="ETF">ETF</Menu.Item>
          <Menu.Item key="LOF">LOF</Menu.Item>
          <Menu.Item key="FOF">FOF</Menu.Item>
        </SubMenu>
      </Menu>
      {stock?.market ? (
        <StockTable query={stock} title={title}/>
      ) : bond ? (
        <ConvertibleBondTable query={bond} title={title}/>
      ) : null}
    </PageContainer>
  );
};

export default QuoteCenter;
