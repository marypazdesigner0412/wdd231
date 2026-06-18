/**
 * ASYNCHRONOUS ENGINE FETCH COMPONENT (Criterion 12)
 * Connects to data.json utilizing robust try/catch block architecture.
 */
export async function fetchFitnessMatrix() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP network fault error detected: State status ${response.status}`);
        }
        const parsedData = await response.json();
        return parsedData;
    } catch (networkFaultError) {
        console.error("Asynchronous processing failure on data source load:", networkFaultError);
        return []; // Fallback gracefully to empty array state representation
    }
}

/**
 * LOCAL STORAGE VISIT AUDITOR (Criterion 9)
 * Stores and processes historical numerical visit integers across browser state cache.
 */
export function trackUserVisits() {
    const STORAGE_KEY = 'tuyi2_visit_record';
    let currentVisitCounter = localStorage.getItem(STORAGE_KEY);

    if (!currentVisitCounter) {
        localStorage.setItem(STORAGE_KEY, '1');
        return 1;
    }

    let processedValue = parseInt(currentVisitCounter, 10) + 1;
    localStorage.setItem(STORAGE_KEY, processedValue.toString());
    return processedValue;
}