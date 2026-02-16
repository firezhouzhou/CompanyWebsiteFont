import React, { useState } from 'react';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaWeixin, FaWeibo, FaLinkedin, FaGithub } from 'react-icons/fa';
import { submitContact } from '../../api/api';
import './Contact.css';

/* ============================================
   Contact Info Data
   ============================================ */

const contactInfo = [
  {
    icon: <FiMapPin />,
    title: '公司地址',
    content: '北京市朝阳区科技园区888号 企业大厦A座',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: <FiPhone />,
    title: '联系电话',
    content: '400-888-8888',
    extra: '商务合作: 010-88888888',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: <FiMail />,
    title: '电子邮箱',
    content: 'contact@company.com',
    extra: '商务合作: business@company.com',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    icon: <FiClock />,
    title: '工作时间',
    content: '周一至周五 9:00 - 18:00',
    extra: '周末及节假日休息',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

const officeLocations = [
  { city: '北京（总部）', address: '朝阳区科技园区888号', phone: '010-88888888' },
  { city: '上海', address: '浦东新区张江高科技园区', phone: '021-66666666' },
  { city: '深圳', address: '南山区科技园南区', phone: '0755-88888888' },
  { city: '杭州', address: '余杭区未来科技城', phone: '0571-88888888' },
  { city: '新加坡', address: 'One Raffles Place Tower', phone: '+65-88888888' },
  { city: '硅谷', address: 'Mountain View, CA', phone: '+1-888-888-8888' },
];

const socialLinks = [
  { icon: <FaWeixin />, name: '微信公众号', link: '#', color: '#07C160' },
  { icon: <FaWeibo />, name: '官方微博', link: '#', color: '#E6162D' },
  { icon: <FaLinkedin />, name: 'LinkedIn', link: '#', color: '#0A66C2' },
  { icon: <FaGithub />, name: 'GitHub', link: '#', color: '#333333' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await submitContact(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      setError('提交失败，请稍后重试或直接联系我们。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero Banner */}
      <section className="contact__hero">
        <div className="container">
          <h1 className="contact__hero-title">联系我们</h1>
          <p className="contact__hero-subtitle">
            期待与您的合作，无论是业务咨询还是技术支持，我们都将竭诚为您服务
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact__info section">
        <div className="container">
          <div className="contact__info-grid">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact__info-card">
                <div
                  className="contact__info-icon"
                  style={{ background: item.gradient }}
                >
                  {item.icon}
                </div>
                <h3 className="contact__info-title">{item.title}</h3>
                <p className="contact__info-content">{item.content}</p>
                {item.extra && (
                  <p className="contact__info-extra">{item.extra}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact__main section section--gray">
        <div className="container">
          <div className="contact__main-grid">
            {/* Contact Form */}
            <div className="contact__form-wrapper">
              <h2 className="contact__form-title">在线留言</h2>
              <p className="contact__form-subtitle">
                填写以下表单，我们将在24小时内与您联系
              </p>

              {isSubmitted ? (
                <div className="contact__success">
                  <FiCheckCircle className="contact__success-icon" />
                  <h3 className="contact__success-title">提交成功！</h3>
                  <p className="contact__success-text">
                    感谢您的留言，我们的工作人员将在24小时内与您联系。
                  </p>
                  <button
                    className="btn btn--primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    继续留言
                  </button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  {error && <div className="contact__form-error">{error}</div>}
                  <div className="contact__form-row">
                    <div className="contact__form-group">
                      <label className="contact__form-label" htmlFor="name">
                        姓名 <span className="contact__form-required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="contact__form-input"
                        placeholder="请输入您的姓名"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact__form-group">
                      <label className="contact__form-label" htmlFor="email">
                        邮箱 <span className="contact__form-required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="contact__form-input"
                        placeholder="请输入您的邮箱地址"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact__form-row">
                    <div className="contact__form-group">
                      <label className="contact__form-label" htmlFor="phone">
                        电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="contact__form-input"
                        placeholder="请输入您的联系电话"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="contact__form-group">
                      <label className="contact__form-label" htmlFor="company">
                        公司名称
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="contact__form-input"
                        placeholder="请输入您的公司名称"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="subject">
                      主题 <span className="contact__form-required">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="contact__form-input contact__form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">请选择咨询主题</option>
                      <option value="business">商务合作</option>
                      <option value="product">产品咨询</option>
                      <option value="solution">解决方案</option>
                      <option value="technical">技术支持</option>
                      <option value="other">其他问题</option>
                    </select>
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__form-label" htmlFor="message">
                      留言内容 <span className="contact__form-required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="contact__form-input contact__form-textarea"
                      placeholder="请详细描述您的需求或问题..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary contact__form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      '提交中...'
                    ) : (
                      <>
                        <FiSend /> 提交留言
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="contact__map-wrapper">
              <h2 className="contact__map-title">公司位置</h2>
              <div className="contact__map-placeholder">
                <FiMapPin className="contact__map-pin" />
                <p className="contact__map-text">北京市朝阳区科技园区888号</p>
                <p className="contact__map-hint">企业大厦A座</p>
                <div className="contact__map-grid-bg">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="contact__map-grid-line" />
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="contact__social">
                <h3 className="contact__social-title">关注我们</h3>
                <div className="contact__social-links">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className="contact__social-link"
                      style={{ '--social-color': item.color }}
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact__social-icon">{item.icon}</span>
                      <span className="contact__social-name">{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="contact__offices section">
        <div className="container">
          <h2 className="section__title">全球办公网络</h2>
          <p className="section__subtitle">
            遍布全球的办公网络，为您提供本地化的贴心服务
          </p>
          <div className="contact__offices-grid">
            {officeLocations.map((office, index) => (
              <div key={index} className="contact__office-card">
                <div className="contact__office-city">
                  <FiMapPin className="contact__office-icon" />
                  {office.city}
                </div>
                <p className="contact__office-address">{office.address}</p>
                <p className="contact__office-phone">
                  <FiPhone className="contact__office-phone-icon" />
                  {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
