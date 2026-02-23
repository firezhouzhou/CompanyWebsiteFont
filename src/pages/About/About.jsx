import React, { useState, useEffect } from 'react';
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiStar,
  FiAward,
  FiUsers,
  FiBriefcase,
  FiMapPin,
} from 'react-icons/fi';
import {
  getTimeline,
  getVisionMission,
  getLeaders,
  getCultureValues,
  getAwards,
  getJobPositions
} from '../../api/api';
import './About.css';

/* ============================================
   Mock Data - 已移至组件内部作为默认值
   ============================================ */

const About = () => {
  // State for data
  const [timeline, setTimeline] = useState([]);
  const [visionMission, setVisionMission] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [cultureValues, setCultureValues] = useState([]);
  const [awards, setAwards] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default data - 默认数据（如果后端没有数据则使用）
  const defaultTimeline = [
    { year: '2005', title: '公司成立', description: '在北京中关村科技园区注册成立，开始技术创业之路' },
    { year: '2008', title: '首轮融资', description: '获得知名投资机构A轮融资，团队扩展至200人' },
    { year: '2012', title: '业务拓展', description: '产品线覆盖云计算、大数据领域，客户突破1000家' },
    { year: '2015', title: '国际化布局', description: '在新加坡、硅谷设立海外研发中心，开启国际化进程' },
    { year: '2018', title: '上市里程碑', description: '成功在A股科创板上市，市值突破百亿' },
    { year: '2020', title: 'AI战略升级', description: '发布全新AI战略，推出自主研发的大模型平台' },
    { year: '2023', title: '全球化深入', description: '业务覆盖50+国家，全球员工突破50000人' },
    { year: '2024', title: '持续创新', description: '发布下一代数字化平台，引领行业技术发展' },
  ];

  const defaultVisionMission = [
    { icon: 'FiEye', title: '愿景', content: '成为全球领先的数字化解决方案提供商，让科技普惠每一个企业。', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { icon: 'FiTarget', title: '使命', content: '以技术创新驱动产业数字化转型，为客户创造持续的商业价值。', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { icon: 'FiHeart', title: '价值观', content: '客户第一、团队合作、拥抱变化、诚信正直、激情敬业。', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  ];

  const defaultLeaders = [
    { id: 1, name: '张建国', title: '创始人兼CEO', initial: '张', color: '#667eea' },
    { id: 2, name: '李明华', title: 'CTO 首席技术官', initial: '李', color: '#f5576c' },
    { id: 3, name: '王晓燕', title: 'COO 首席运营官', initial: '王', color: '#4facfe' },
    { id: 4, name: '陈伟强', title: 'CFO 首席财务官', initial: '陈', color: '#43e97b' },
    { id: 5, name: '刘思远', title: '首席产品官', initial: '刘', color: '#fa709a' },
    { id: 6, name: '赵文博', title: '首席人力官', initial: '赵', color: '#a18cd1' },
  ];

  const defaultCultureValues = [
    { icon: 'FiStar', title: '创新驱动', description: '鼓励创新思维，拥抱技术变革' },
    { icon: 'FiUsers', title: '团队协作', description: '开放包容的团队文化，合作共赢' },
    { icon: 'FiHeart', title: '员工关怀', description: '关注员工成长，提供全面福利保障' },
    { icon: 'FiTarget', title: '追求卓越', description: '精益求精，持续提升产品和服务品质' },
  ];

  const defaultAwards = [
    '国家高新技术企业认证',
    '年度最佳科技创新企业',
    '中国软件百强企业',
    '全球云计算领导者象限',
    '最佳雇主品牌奖',
    '企业社会责任优秀奖',
  ];

  const defaultJobPositions = [
    { title: '高级前端工程师', department: '技术部', location: '北京' },
    { title: '大数据架构师', department: '技术部', location: '上海' },
    { title: 'AI算法工程师', department: '研发部', location: '深圳' },
    { title: '产品经理', department: '产品部', location: '杭州' },
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          timelineRes,
          visionRes,
          leadersRes,
          cultureRes,
          awardsRes,
          jobsRes
        ] = await Promise.allSettled([
          getTimeline(),
          getVisionMission(),
          getLeaders(),
          getCultureValues(),
          getAwards(),
          getJobPositions()
        ]);

        // 设置timeline数据（如果后端有数据则使用后端数据，否则使用默认数据）
        if (timelineRes.status === 'fulfilled' && timelineRes.value?.data?.length > 0) {
          setTimeline(timelineRes.value.data.map(item => ({
            year: item.year,
            title: item.title,
            desc: item.description
          })));
        } else {
          setTimeline(defaultTimeline);
        }

        // 设置愿景使命数据
        if (visionRes.status === 'fulfilled' && visionRes.value?.data?.length > 0) {
          setVisionMission(visionRes.value.data.map(item => {
            const iconMap = { 'FiEye': <FiEye />, 'FiTarget': <FiTarget />, 'FiHeart': <FiHeart /> };
            return {
              icon: iconMap[item.icon] || <FiStar />,
              title: item.title,
              content: item.content,
              gradient: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            };
          }));
        } else {
          setVisionMission(defaultVisionMission.map(item => ({
            ...item,
            icon: item.icon === 'FiEye' ? <FiEye /> : item.icon === 'FiTarget' ? <FiTarget /> : <FiHeart />
          })));
        }

        // 设置领导团队数据
        if (leadersRes.status === 'fulfilled' && leadersRes.value?.data?.length > 0) {
          setLeaders(leadersRes.value.data);
        } else {
          setLeaders(defaultLeaders);
        }

        // 设置企业文化数据
        if (cultureRes.status === 'fulfilled' && cultureRes.value?.data?.length > 0) {
          setCultureValues(cultureRes.value.data.map(item => {
            const iconMap = { 'FiStar': <FiStar />, 'FiUsers': <FiUsers />, 'FiHeart': <FiHeart />, 'FiTarget': <FiTarget /> };
            return {
              icon: iconMap[item.icon] || <FiStar />,
              title: item.title,
              desc: item.description
            };
          }));
        } else {
          setCultureValues(defaultCultureValues.map(item => ({
            ...item,
            icon: item.icon === 'FiStar' ? <FiStar /> : item.icon === 'FiUsers' ? <FiUsers /> : item.icon === 'FiHeart' ? <FiHeart /> : <FiTarget />
          })));
        }

        // 设置荣誉资质数据
        if (awardsRes.status === 'fulfilled' && awardsRes.value?.data?.length > 0) {
          setAwards(awardsRes.value.data.map(item => item.name));
        } else {
          setAwards(defaultAwards);
        }

        // 设置招聘职位数据
        if (jobsRes.status === 'fulfilled' && jobsRes.value?.data?.length > 0) {
          setJobPositions(jobsRes.value.data.map(item => ({
            title: item.title,
            dept: item.department,
            location: item.location
          })));
        } else {
          setJobPositions(defaultJobPositions);
        }

      } catch (error) {
        console.error('获取About数据失败:', error);
        // 使用默认数据
        setTimeline(defaultTimeline);
        setVisionMission(defaultVisionMission.map(item => ({
          ...item,
          icon: item.icon === 'FiEye' ? <FiEye /> : item.icon === 'FiTarget' ? <FiTarget /> : <FiHeart />
        })));
        setLeaders(defaultLeaders);
        setCultureValues(defaultCultureValues.map(item => ({
          ...item,
          icon: item.icon === 'FiStar' ? <FiStar /> : item.icon === 'FiUsers' ? <FiUsers /> : item.icon === 'FiHeart' ? <FiHeart /> : <FiTarget />
        })));
        setAwards(defaultAwards);
        setJobPositions(defaultJobPositions);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="about">
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="container">
          <h1 className="about__hero-title">关于我们</h1>
          <p className="about__hero-subtitle">
            一家以技术创新驱动的数字化解决方案领导者
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="about__timeline section">
        <div className="container">
          <h2 className="section__title">发展历程</h2>
          <p className="section__subtitle">
            从创业初心到全球化企业，见证我们的每一步成长
          </p>
          <div className="about__timeline-track">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`about__timeline-item ${index % 2 === 0 ? 'about__timeline-item--left' : 'about__timeline-item--right'}`}
              >
                <div className="about__timeline-content">
                  <span className="about__timeline-year">{item.year}</span>
                  <h4 className="about__timeline-title">{item.title}</h4>
                  <p className="about__timeline-desc">{item.desc}</p>
                </div>
                <div className="about__timeline-dot"></div>
              </div>
            ))}
            <div className="about__timeline-line"></div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about__vision section section--gray">
        <div className="container">
          <h2 className="section__title">愿景与使命</h2>
          <p className="section__subtitle">
            明确的方向指引我们不断前行
          </p>
          <div className="about__vision-grid">
            {visionMission.map((item, index) => (
              <div key={index} className="about__vision-card">
                <div
                  className="about__vision-icon"
                  style={{ background: item.gradient }}
                >
                  {item.icon}
                </div>
                <h3 className="about__vision-title">{item.title}</h3>
                <p className="about__vision-content">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="about__team section">
        <div className="container">
          <h2 className="section__title">管理团队</h2>
          <p className="section__subtitle">
            经验丰富的领导团队引领企业持续发展
          </p>
          <div className="about__team-grid">
            {leaders.map((leader) => (
              <div key={leader.id} className="about__team-card">
                <div
                  className="about__team-avatar"
                  style={{ backgroundColor: leader.color }}
                >
                  {leader.initial}
                </div>
                <h4 className="about__team-name">{leader.name}</h4>
                <p className="about__team-title">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="about__culture section section--gray">
        <div className="container">
          <h2 className="section__title">企业文化</h2>
          <p className="section__subtitle">
            良好的企业文化是我们持续发展的基石
          </p>
          <div className="about__culture-grid">
            {cultureValues.map((item, index) => (
              <div key={index} className="about__culture-card">
                <div className="about__culture-icon">{item.icon}</div>
                <h4 className="about__culture-title">{item.title}</h4>
                <p className="about__culture-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="about__awards section">
        <div className="container">
          <h2 className="section__title">荣誉资质</h2>
          <p className="section__subtitle">
            权威认可与行业殊荣
          </p>
          <div className="about__awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="about__award-item">
                <FiAward className="about__award-icon" />
                <span className="about__award-name">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="about__careers section section--gray">
        <div className="container">
          <h2 className="section__title">加入我们</h2>
          <p className="section__subtitle">
            与优秀的人一起，做有意义的事
          </p>
          <div className="about__careers-list">
            {jobPositions.map((job, index) => (
              <div key={index} className="about__career-item">
                <div className="about__career-info">
                  <h4 className="about__career-title">
                    <FiBriefcase className="about__career-icon" />
                    {job.title}
                  </h4>
                  <div className="about__career-meta">
                    <span>{job.dept}</span>
                    <span className="about__career-divider">·</span>
                    <span>
                      <FiMapPin className="about__career-loc-icon" /> {job.location}
                    </span>
                  </div>
                </div>
                <button className="btn btn--outline about__career-btn">
                  投递简历
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
