import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell nf">
      <p className="nf__code">404</p>
      <p>هذه الصفحة غير موجودة · This page does not exist.</p>
      <Link className="btn" href="/">قالب · Qalib</Link>
    </div>
  );
}
