interface AddToCartButtonProps {
  padding?: string
  fontSize?: string
}

const AddToCartButton = ({ padding, fontSize }: AddToCartButtonProps) => {
  return (
    <button
      type='button'
      style={{
        border: '1.5px solid #272727ff',
        padding,
        fontSize,
        borderRadius: '20px',
        width: 'max-content',
        cursor: 'pointer',
      }}>
      Add to Cart
    </button>
  )
}

export default AddToCartButton
