import { memo } from 'react';

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex gap-3">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-[52px] w-[52px] flex-shrink-0 rounded border border-edge bg-paper object-contain dark:border-edge-dark dark:bg-paper-dark"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="m-0 text-sm font-medium leading-snug">{item.title}</p>
          <button
            type="button"
            className="flex-shrink-0 text-xs text-danger hover:underline dark:text-danger-dark"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center overflow-hidden rounded border border-edge dark:border-edge-dark">
            <button
              type="button"
              className="h-6 w-6 text-sm hover:bg-paper dark:hover:bg-paper-dark"
              onClick={() => onDecrease(item.id)}
              aria-label={`Decrease quantity of ${item.title}`}
            >
              −
            </button>
            <span className="min-w-[1.6ch] text-center text-sm tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              className="h-6 w-6 text-sm hover:bg-paper dark:hover:bg-paper-dark"
              onClick={() => onIncrease(item.id)}
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>

          <span className="text-sm font-semibold tabular-nums">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);