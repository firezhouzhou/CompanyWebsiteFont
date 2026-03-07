import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWeixin, FaWeibo, FaLinkedin, FaGithub } from 'react-icons/fa';
import { getFooterConfig } from '../../api/api';
import './Footer.css';

const DEFAULTS = {
  footer_description: '领先的数字化解决方案提供商，致力于通过技术创新为全球客户创造价值，推动产业数字化转型升级。',
  footer_contact_address: '北京市朝阳区科技园区888号',
  footer_contact_phone: '400-888-8888',
  footer_contact_email: 'contact@company.com',
  footer_copyright: '',
  footer_icp: '',
  footer_icp_link: '',
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [config, setConfig] = useState(DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    async function fetchConfig() {
      try {
        const res = await getFooterConfig();
        const list = res?.data || res || [];
        if (!cancelled && Array.isArray(list) && list.length > 0) {
          const map = { ...DEFAULTS };
          list.forEach((item) => {
            const k = item.configKey || item.key;
            const v = item.configValue || item.value;
            if (k && v) {
              map[k] = v;
            }
          });
          setConfig(map);
        }
      } catch {
        // API 不可用时使用默认值
      }
    }
    fetchConfig();
    return () => { cancelled = true; };
  }, []);

  const copyright = config.footer_copyright
    || `\u00A9 ${currentYear} 企业集团. All Rights Reserved. 保留所有权利.`;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main container">
        {/* Company Info Column */}
        <div className="footer__column footer__column--brand">
          <Link to="/" className="footer__logo">
            <div className="footer__logo-icon">E</div>
            <span className="footer__logo-text">企业集团</span>
          </Link>
          <p className="footer__description">
            {config.footer_description}
          </p>
          <div className="footer__social">
            <a
              href="https://weixin.qq.com"
              className="footer__social-link"
              aria-label="微信"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWeixin />
            </a>
            <a
              href="https://weibo.com"
              className="footer__social-link"
              aria-label="微博"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWeibo />
            </a>
            <a
              href="https://linkedin.com"
              className="footer__social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              className="footer__social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Products Column */}
        <div className="footer__column">
          <h3 className="footer__column-title">产品与服务</h3>
          <ul className="footer__link-list">
            <li><Link to="/products" className="footer__link">云计算平台</Link></li>
            <li><Link to="/products" className="footer__link">大数据分析</Link></li>
            <li><Link to="/products" className="footer__link">人工智能</Link></li>
            <li><Link to="/products" className="footer__link">物联网平台</Link></li>
            <li><Link to="/products" className="footer__link">企业安全</Link></li>
          </ul>
        </div>

        {/* Solutions Column */}
        <div className="footer__column">
          <h3 className="footer__column-title">解决方案</h3>
          <ul className="footer__link-list">
            <li><Link to="/solutions" className="footer__link">金融行业</Link></li>
            <li><Link to="/solutions" className="footer__link">零售电商</Link></li>
            <li><Link to="/solutions" className="footer__link">智能制造</Link></li>
            <li><Link to="/solutions" className="footer__link">医疗健康</Link></li>
            <li><Link to="/solutions" className="footer__link">智慧城市</Link></li>
          </ul>
        </div>

        {/* About Column */}
        <div className="footer__column">
          <h3 className="footer__column-title">关于我们</h3>
          <ul className="footer__link-list">
            <li><Link to="/about" className="footer__link">公司简介</Link></li>
            <li><Link to="/about" className="footer__link">发展历程</Link></li>
            <li><Link to="/about" className="footer__link">团队介绍</Link></li>
            <li><Link to="/about" className="footer__link">加入我们</Link></li>
            <li><Link to="/contact" className="footer__link">联系我们</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer__column footer__column--contact">
          <h3 className="footer__column-title">联系方式</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <FiMapPin className="footer__contact-icon" />
              <span>{config.footer_contact_address}</span>
            </li>
            <li className="footer__contact-item">
              <FiPhone className="footer__contact-icon" />
              <span>{config.footer_contact_phone}</span>
            </li>
            <li className="footer__contact-item">
              <FiMail className="footer__contact-icon" />
              <span>{config.footer_contact_email}</span>
            </li>
          </ul>
          {/* WeChat QR Code Placeholder */}
          <div className="footer__qrcode">
            <div className="footer__qrcode-placeholder">
              <FaWeixin className="footer__qrcode-icon" />
            </div>
            <span className="footer__qrcode-text">扫码关注公众号</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-content">
          <p className="footer__copyright">{copyright}</p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__bottom-link">隐私政策</Link>
            <span className="footer__bottom-divider">|</span>
            <Link to="/terms" className="footer__bottom-link">服务条款</Link>
            <span className="footer__bottom-divider">|</span>
            <Link to="/sitemap" className="footer__bottom-link">网站地图</Link>
          </div>
          {config.footer_icp && (
            <p className="footer__icp">
              {config.footer_icp_link ? (
                <a
                  href={config.footer_icp_link}
                  className="footer__icp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.footer_icp}
                </a>
              ) : (
                config.footer_icp
              )}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
