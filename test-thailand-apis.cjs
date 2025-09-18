// Test script for Thailand Address APIs
// รันด้วย: node test-thailand-apis.js

const https = require('https');
const http = require('http');

// Helper function to make HTTP requests
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            success: true,
            status: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Invalid JSON response',
            data: data.slice(0, 500)
          });
        }
      });
      
    }).on('error', (error) => {
      reject({
        success: false,
        error: error.message
      });
    });
  });
}

// Test APIs - Updated with WORKING APIs from kongvut/thai-province-data
const APIs_TO_TEST = [
  {
    name: 'Thailand Complete Data (kongvut)',
    url: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json',
    description: 'Complete nested data: provinces -> amphures -> tambons'
  },
  {
    name: 'Thailand Provinces Only',
    url: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json',
    description: 'Provinces data only'
  },
  {
    name: 'Thailand Amphures Only',
    url: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json',
    description: 'Amphures (Districts) data only'
  },
  {
    name: 'Thailand Tambons Only',
    url: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json',
    description: 'Tambons (Subdistricts) data only'
  }
];

async function testAPI(apiInfo) {
  console.log(`\n🔍 Testing: ${apiInfo.name}`);
  console.log(`📝 Description: ${apiInfo.description}`);
  console.log(`🔗 URL: ${apiInfo.url}`);
  console.log('─'.repeat(80));
  
  try {
    const startTime = Date.now();
    const result = await fetchData(apiInfo.url);
    const endTime = Date.now();
    
    if (result.success) {
      console.log(`✅ Status: ${result.status}`);
      console.log(`⚡ Response time: ${endTime - startTime}ms`);
      
      const data = result.data;
      
      // Analyze data structure
      if (Array.isArray(data)) {
        console.log(`📊 Data type: Array`);
        console.log(`📈 Total items: ${data.length}`);
        
        if (data.length > 0) {
          console.log(`🔍 Sample item structure:`);
          console.log(JSON.stringify(data[0], null, 2).slice(0, 300) + '...');
        }
      } else if (typeof data === 'object') {
        console.log(`📊 Data type: Object`);
        console.log(`📈 Top-level keys: ${Object.keys(data).length}`);
        console.log(`🔑 Keys: ${Object.keys(data).slice(0, 5).join(', ')}${Object.keys(data).length > 5 ? '...' : ''}`);
        
        // Show sample of first key
        const firstKey = Object.keys(data)[0];
        if (firstKey && data[firstKey]) {
          console.log(`🔍 Sample data for key "${firstKey}":`);
          console.log(JSON.stringify(data[firstKey], null, 2).slice(0, 300) + '...');
        }
      }
      
      return {
        name: apiInfo.name,
        success: true,
        responseTime: endTime - startTime,
        dataSize: Array.isArray(data) ? data.length : Object.keys(data).length,
        structure: Array.isArray(data) ? 'array' : 'object'
      };
      
    } else {
      console.log(`❌ Failed: ${result.error}`);
      if (result.data) {
        console.log(`📄 Raw response (first 200 chars): ${result.data.slice(0, 200)}...`);
      }
      
      return {
        name: apiInfo.name,
        success: false,
        error: result.error
      };
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return {
      name: apiInfo.name,
      success: false,
      error: error.message
    };
  }
}

// Main execution
async function main() {
  console.log('🇹🇭 Thailand Address APIs Testing');
  console.log('═'.repeat(80));
  
  const results = [];
  
  for (const api of APIs_TO_TEST) {
    const result = await testAPI(api);
    results.push(result);
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('\n📊 SUMMARY');
  console.log('═'.repeat(80));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful APIs: ${successful.length}`);
  console.log(`❌ Failed APIs: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n🏆 Ranking by Response Time:');
    successful
      .sort((a, b) => a.responseTime - b.responseTime)
      .forEach((result, index) => {
        console.log(`${index + 1}. ${result.name} - ${result.responseTime}ms (${result.dataSize} items, ${result.structure})`);
      });
      
    const fastest = successful.sort((a, b) => a.responseTime - b.responseTime)[0];
    console.log(`\n🎯 RECOMMENDATION: Use "${fastest.name}" for best performance!`);
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed APIs:');
    failed.forEach(result => {
      console.log(`- ${result.name}: ${result.error}`);
    });
  }
}

// Run the test
main().catch(console.error);