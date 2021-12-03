import React, { useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./FeaturedInfo.css";
import axiosClient from '../../utils/axiosClient';

const FeaturedInfo = () => {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
      const getIncome = async () => {
          try {
            const res = await axiosClient.get("http://localhost:5000/api/order/income");
            console.log(res);
            if(res && res.data && res.data.success === true){
              setIncome(res.data.income);
              setPerc((res.data.income[1].total * 100) / res.data.income[0].total - 100);
            }
          } catch(err) {
            console.log(err);
          }
      };
      getIncome();
    }, []);

    return (
        <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${income[1]?.total}</span>
            <span className="featuredMoneyRate">
              %{Math.floor(perc)}{" "}
              {perc < 0 ? (
                <ArrowDownward className="featuredIcon negative" />
              ) : (
                <ArrowUpward className="featuredIcon" />
              )}
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,415</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,225</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    )
}

export default FeaturedInfo
