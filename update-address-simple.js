/**
 * Simple script to update contract address on playzzza.xyz
 *
 * Usage:
 * updateAddress("your_contract_address_here");
 * updateAddress(""); // To set empty address
 */

async function updateAddress(contractAddress) {
  try {
    const response = await fetch('https://www.playzzza.xyz/api/contract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Success! Contract address updated to:', result.contractAddress || '(empty)');
    } else {
      console.error('❌ Error:', result.error);
    }

    return result;
  } catch (error) {
    console.error('❌ Network error:', error);
    return { success: false, error: error.message };
  }
}

// call the function
updateAddress("");
