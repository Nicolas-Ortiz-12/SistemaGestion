import React from 'react'
import styles from './pagination.module.css' 

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const prevEnabled = currentPage > 1
    const nextEnabled = currentPage < totalPages

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page)
        }
    }

    // calculo de páginas a mostrar (1–6 + ... + última)
    const pagesToShow = Array.from({ length: Math.min(6, totalPages) }, (_, i) => i + 1)

    return (
        <ul className={styles.page}>
            <li
                className={`${styles.pageBtn} ${prevEnabled ? styles.pageBtnActive : ''}`}
                onClick={() => prevEnabled && handleClick(currentPage - 1)}
            >
                <span className="material-icons">chevron_left</span>
            </li>

            {pagesToShow.map((p) => (
                <li
                    key={p}
                    className={`${styles.pageNumber} ${p === currentPage ? styles.pageNumberActive : ''}`}
                    onClick={() => handleClick(p)}
                >
                    {p}
                </li>
            ))}

            {totalPages > 7 && (
                <>
                    <li className={styles.pageDots}>…</li>
                    <li
                        className={`${styles.pageNumber} ${totalPages === currentPage ? styles.pageNumberActive : ''}`}
                        onClick={() => handleClick(totalPages)}
                    >
                        {totalPages}
                    </li>
                </>
            )}

            <li
                className={`${styles.pageBtn} ${nextEnabled ? styles.pageBtnActive : ''}`}
                onClick={() => nextEnabled && handleClick(currentPage + 1)}
            >
                <span className="material-icons">chevron_right</span>
            </li>
        </ul>
    )
}

export default Pagination
