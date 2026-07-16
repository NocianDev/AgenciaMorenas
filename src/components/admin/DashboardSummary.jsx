export default function DashboardSummary({ orders, vehicles, drivers }) {
  const count = status => orders.filter(o => status.includes(o.status)).length;
  const cards = [['Pedidos totales', orders.length], ['Solicitudes nuevas', count(['REQUESTED'])], ['Pendientes de pago', count(['QUOTED','AWAITING_PAYMENT'])], ['Listos para salir', count(['UNIT_ASSIGNED','READY_TO_DEPART'])], ['En ruta', count(['IN_TRANSIT','AT_CUSTOMS'])], ['Entregados', count(['DELIVERED'])], ['Unidades disponibles', vehicles.filter(v => v.active && v.status === 'AVAILABLE').length], ['Operadores activos', drivers.filter(d => d.active).length]];
  return <section className="admin-summary">{cards.map(([label, value]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</section>;
}
