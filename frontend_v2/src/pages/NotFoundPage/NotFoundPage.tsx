import { GenericLayout } from "@shared/layouts/AppLayout";
import { Button } from "antd";
import styles from './NotFoundPage.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "@app/router/router";

export function NotFoundPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const onClickBackToFeed = () => {
    navigate(AppRoutes.HOME)
  }

  return (
    <GenericLayout>
      <div className={styles.layout}>
        <h1>Упс, cтраница <span className={styles.url_path}>{location.pathname}</span> не найдена</h1>
        <Button onClick={onClickBackToFeed} type="primary" size="large" style={{ minWidth: 220 }}>Вернуться в ленту</Button>
      </div>
    </GenericLayout>
  )
}