// Sales Lead Data Array - Will be populated from API dynamically
let leadsData = [];
let isFetchingData = false;
let totalLeadsGenerated = 0;

// Business name prefixes and suffixes for realistic company names
const businessPrefixes = ['Premium', 'Elite', 'Professional', 'Premier', 'Advanced', 'Superior', 'Quality', 'Reliable', 'Expert', 'Master', 'Certified', 'Local', 'Regional', 'National', 'Coastal', 'Metro', 'City', 'County', 'State', 'Sunshine'];
const businessTypes = ['Construction', 'Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Painting', 'Restoration', 'Remodeling', 'Landscaping', 'Cleaning', 'Pest Control', 'Security', 'Consulting', 'Marketing', 'IT Services', 'Auto Repair', 'Real Estate', 'Insurance', 'Legal Services', 'Medical'];
const businessSuffixes = ['LLC', 'Inc', 'Corp', 'Co', 'Solutions', 'Services', 'Group', 'Partners', 'Enterprises', 'Contractors', 'Associates', 'Professionals'];

// Industries for variety
const industries = ['Construction', 'Home Services', 'HVAC', 'Electrical', 'Plumbing', 'Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Real Estate', 'Finance', 'Legal', 'Marketing', 'Consulting'];

// Loss reasons
const lossReasons = ['Price too high', 'Went with competitor', 'Budget constraints', 'Not interested', 'No response', 'Timing not right', 'Service not needed', 'Found alternative solution', 'Company closed', 'Decision postponed'];

// Representative names
const repNames = ['Wilson', 'Johnson', 'Martinez', 'Anderson', 'Taylor', 'Brown', 'Davis', 'Miller', 'Garcia', 'Rodriguez', 'Williams', 'Jones', 'Smith', 'Lee', 'White'];

// US States with timezones
const statesWithTimezones = [
    { state: 'California', timezone: 'Pacific Standard Time', abbr: 'PST' },
    { state: 'Texas', timezone: 'Central Standard Time', abbr: 'CST' },
    { state: 'Florida', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'New York', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'Illinois', timezone: 'Central Standard Time', abbr: 'CST' },
    { state: 'Pennsylvania', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'Ohio', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'Georgia', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'North Carolina', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'Michigan', timezone: 'Eastern Standard Time', abbr: 'EST' },
    { state: 'Arizona', timezone: 'Mountain Standard Time', abbr: 'MST' },
    { state: 'Washington', timezone: 'Pacific Standard Time', abbr: 'PST' },
    { state: 'Colorado', timezone: 'Mountain Standard Time', abbr: 'MST' },
    { state: 'Oregon', timezone: 'Pacific Standard Time', abbr: 'PST' },
    { state: 'Nevada', timezone: 'Pacific Standard Time', abbr: 'PST' }
];

// Advisor notes templates
const advisorNotes = [
    'High potential client, follow up in Q2',
    'Strong revenue, needs better financing options',
    'Small operation, potential for growth',
    'Seasonal business, best to contact in summer',
    'Decision maker hard to reach, try mornings',
    'Interested in expansion plans',
    'Looking for long-term partnership',
    'Requires competitive pricing',
    'Previous customer, good relationship',
    'New business, high growth potential',
    'Family-owned operation, values personal service',
    'Tech-savvy, prefers email communication',
    'Price-sensitive market segment',
    'Quality-focused, willing to pay premium',
    'Urgent need, quick decision maker'
];

/**
 * Generate a random business name
 */
function generateBusinessName() {
    const prefix = businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)];
    const type = businessTypes[Math.floor(Math.random() * businessTypes.length)];
    const suffix = businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)];
    return `${prefix} ${type} ${suffix}`.toUpperCase();
}

/**
 * Generate random phone number
 */
function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstPart = Math.floor(Math.random() * 900) + 100;
    const secondPart = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

/**
 * Generate random date in the past year
 */
function generateRandomDate() {
    const end = new Date();
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
}

/**
 * Generate random sales amount
 */
function generateSalesAmount(min, max) {
    const amount = Math.floor(Math.random() * (max - min) + min);
    return `$${amount.toLocaleString()}`;
}

/**
 * Generate random time
 */
function generateLocalTime(tzAbbr) {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const period = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hour}:${minute} ${period} ${tzAbbr}`;
}

/**
 * Fetch random users from API and convert to lead data
 */
async function fetchRandomLeads(count = 10) {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us`);
        const data = await response.json();
        
        return data.results.map((user, index) => {
            const stateInfo = statesWithTimezones[Math.floor(Math.random() * statesWithTimezones.length)];
            const annualSalesAmount = Math.floor(Math.random() * 900000) + 100000;
            const monthlySalesAmount = Math.floor(annualSalesAmount / 12);
            
            totalLeadsGenerated++;
            
            return {
                accountName: generateBusinessName(),
                recordType: 'Business',
                yearsInBusiness: String(Math.floor(Math.random() * 25) + 1),
                contactMobile: generatePhoneNumber(),
                closedLostDate: generateRandomDate(),
                lossReason: lossReasons[Math.floor(Math.random() * lossReasons.length)],
                annualSales: generateSalesAmount(50000, 1000000),
                state: stateInfo.state,
                timezone: stateInfo.timezone,
                contactName: `${user.name.first} ${user.name.last}`,
                industry: industries[Math.floor(Math.random() * industries.length)],
                businessPhone: generatePhoneNumber(),
                contactPhone: generatePhoneNumber(),
                lastRep: repNames[Math.floor(Math.random() * repNames.length)],
                monthlySales: generateSalesAmount(4000, 100000),
                advisorNotes: advisorNotes[Math.floor(Math.random() * advisorNotes.length)],
                localTime: generateLocalTime(stateInfo.abbr),
                recordCount: `${totalLeadsGenerated} of ∞`
            };
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        // Return empty array if API fails
        return [];
    }
}

/**
 * Initialize leads data - fetch initial batch
 */
async function initializeLeads() {
    // Show loading indicator
    const loadingElement = document.getElementById('accountName');
    if (loadingElement) {
        loadingElement.textContent = 'Loading leads data...';
    }
    
    // Fetch initial batch of 10 leads
    leadsData = await fetchRandomLeads(10);
    
    // If API fails, create some fallback data
    if (leadsData.length === 0) {
        console.warn('API fetch failed, using fallback data');
        leadsData = createFallbackData(10);
    }
    
    console.log(`Successfully loaded ${leadsData.length} leads (Unlimited mode - more will load automatically)`);
    return leadsData;
}

/**
 * Fetch more leads dynamically in the background
 */
async function fetchMoreLeadsInBackground() {
    if (isFetchingData) return;
    
    isFetchingData = true;
    console.log('Fetching more leads in background...');
    
    try {
        const newLeads = await fetchRandomLeads(10);
        if (newLeads.length > 0) {
            leadsData.push(...newLeads);
            console.log(`Added ${newLeads.length} more leads. Total: ${leadsData.length}`);
        } else {
            // Fallback if API fails
            const fallbackLeads = createFallbackData(10);
            leadsData.push(...fallbackLeads);
        }
    } catch (error) {
        console.error('Error fetching more leads:', error);
    } finally {
        isFetchingData = false;
    }
}

/**
 * Create fallback data if API fails
 */
function createFallbackData(count = 10) {
    const fallbackNames = ['John Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'Michael Davis', 'Jennifer Taylor', 'James Anderson', 'Linda Martinez', 'David Wilson', 'Sarah Garcia'];
    return Array.from({ length: count }, (_, index) => {
        const stateInfo = statesWithTimezones[Math.floor(Math.random() * statesWithTimezones.length)];
        totalLeadsGenerated++;
        return {
            accountName: generateBusinessName(),
            recordType: 'Business',
            yearsInBusiness: String(Math.floor(Math.random() * 25) + 1),
            contactMobile: generatePhoneNumber(),
            closedLostDate: generateRandomDate(),
            lossReason: lossReasons[Math.floor(Math.random() * lossReasons.length)],
            annualSales: generateSalesAmount(50000, 1000000),
            state: stateInfo.state,
            timezone: stateInfo.timezone,
            contactName: fallbackNames[Math.floor(Math.random() * fallbackNames.length)],
            industry: industries[Math.floor(Math.random() * industries.length)],
            businessPhone: generatePhoneNumber(),
            contactPhone: generatePhoneNumber(),
            lastRep: repNames[Math.floor(Math.random() * repNames.length)],
            monthlySales: generateSalesAmount(4000, 100000),
            advisorNotes: advisorNotes[Math.floor(Math.random() * advisorNotes.length)],
            localTime: generateLocalTime(stateInfo.abbr),
            recordCount: `${totalLeadsGenerated} of ∞`
        };
    });
}

// Current record index
let currentIndex = 0;

// Timer variables
let countdownInterval = null;
let secondsRemaining = 0;

/**
 * Display the current lead record on the page
 */
function displayRecord() {
    const lead = leadsData[currentIndex];
    
    // Update all fields
    document.getElementById('accountName').textContent = lead.accountName;
    document.getElementById('recordType').textContent = lead.recordType;
    document.getElementById('yearsInBusiness').textContent = lead.yearsInBusiness;
    document.getElementById('contactMobile').textContent = lead.contactMobile;
    document.getElementById('closedLostDate').textContent = lead.closedLostDate;
    document.getElementById('lossReason').textContent = lead.lossReason;
    document.getElementById('annualSales').textContent = lead.annualSales;
    document.getElementById('state').textContent = lead.state;
    document.getElementById('timezone').textContent = lead.timezone;
    
    document.getElementById('contactName').textContent = lead.contactName;
    document.getElementById('industry').textContent = lead.industry;
    document.getElementById('businessPhone').textContent = lead.businessPhone;
    document.getElementById('contactPhone').textContent = lead.contactPhone;
    document.getElementById('lastRep').textContent = lead.lastRep;
    document.getElementById('monthlySales').textContent = lead.monthlySales;
    document.getElementById('advisorNotes').textContent = lead.advisorNotes;
    document.getElementById('localTime').textContent = lead.localTime;
    document.getElementById('recordCount').textContent = lead.recordCount;
}

/**
 * Handle Next Record button click with 5-second countdown
 */
function nextRecord() {
    const nextBtn = document.getElementById('nextBtn');
    const countdownElement = document.getElementById('countdown');
    
    // Disable button
    nextBtn.disabled = true;
    
    // Start 5-second countdown
    secondsRemaining = 5;
    countdownElement.textContent = `Loading next record in ${secondsRemaining}s...`;
    
    countdownInterval = setInterval(() => {
        secondsRemaining--;
        
        if (secondsRemaining > 0) {
            countdownElement.textContent = `Loading next record in ${secondsRemaining}s...`;
        } else {
            // Timer complete - load next record
            clearInterval(countdownInterval);
            countdownElement.textContent = '';
            
            // Move to next record
            currentIndex++;
            
            // Check if we need to fetch more data (when we're 3 records away from the end)
            if (currentIndex >= leadsData.length - 3) {
                fetchMoreLeadsInBackground();
            }
            
            // If we've reached the end, wait a moment for data to load
            if (currentIndex >= leadsData.length) {
                countdownElement.textContent = 'Loading more leads...';
                // Wait for data to be available
                const checkDataInterval = setInterval(() => {
                    if (currentIndex < leadsData.length) {
                        clearInterval(checkDataInterval);
                        countdownElement.textContent = '';
                        displayRecord();
                        nextBtn.disabled = false;
                    }
                }, 100);
            } else {
                // Display the new record
                displayRecord();
                
                // Re-enable button
                nextBtn.disabled = false;
            }
        }
    }, 1000);
}

/**
 * Toggle collapsible sections
 * @param {string} sectionId - ID of the section to toggle
 */
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const arrow = document.getElementById(`arrow-${sectionId}`);
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.classList.remove('expanded');
    } else {
        content.classList.add('show');
        arrow.classList.add('expanded');
    }
}

/**
 * Initialize the application
 */
async function init() {
    // Initialize leads data from API
    await initializeLeads();
    
    // Display the first record on page load
    displayRecord();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Text Message Modal Functions
function openTextModal() {
    const modal = document.getElementById('textModal');
    modal.style.display = 'flex';
    document.getElementById('textMessage').value = ''; // Clear previous text
}

function closeTextModal() {
    const modal = document.getElementById('textModal');
    modal.style.display = 'none';
}

function sendTextMessage() {
    const messageText = document.getElementById('textMessage').value.trim();
    
    if (messageText === '') {
        alert('Please enter a message before sending.');
        return;
    }
    
    // Close the modal
    closeTextModal();
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('textModal');
    if (event.target === modal) {
        closeTextModal();
    }
}
