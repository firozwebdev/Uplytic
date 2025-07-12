-- Uplytic Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id BIGSERIAL PRIMARY KEY,
    api_id BIGINT REFERENCES apis(id) ON DELETE CASCADE,
    api_name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'critical', 'warning', 'ai_insight'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT NOT NULL, -- 'critical', 'warning'
    recommendation TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_alerts_api_id ON alerts(api_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for alerts
-- Allow users to view alerts for their APIs
CREATE POLICY "Users can view alerts for their APIs" ON alerts
    FOR SELECT USING (
        api_id IN (
            SELECT id FROM apis WHERE user_id = auth.uid()
        )
    );

-- Allow users to insert alerts for their APIs
CREATE POLICY "Users can insert alerts for their APIs" ON alerts
    FOR INSERT WITH CHECK (
        api_id IN (
            SELECT id FROM apis WHERE user_id = auth.uid()
        )
    );

-- Allow users to update alerts for their APIs
CREATE POLICY "Users can update alerts for their APIs" ON alerts
    FOR UPDATE USING (
        api_id IN (
            SELECT id FROM apis WHERE user_id = auth.uid()
        )
    );

-- Ensure apis table has the required columns
-- Add cost_per_hour column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'apis' AND column_name = 'cost_per_hour') THEN
        ALTER TABLE apis ADD COLUMN cost_per_hour DECIMAL(10,2) DEFAULT 0;
    END IF;
END $$;

-- Add uuid column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'apis' AND column_name = 'uuid') THEN
        ALTER TABLE apis ADD COLUMN uuid UUID DEFAULT gen_random_uuid();
    END IF;
END $$;

-- Add is_public column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'apis' AND column_name = 'is_public') THEN
        ALTER TABLE apis ADD COLUMN is_public BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Create indexes for better performance on apis table
CREATE INDEX IF NOT EXISTS idx_apis_user_id ON apis(user_id);
CREATE INDEX IF NOT EXISTS idx_apis_uuid ON apis(uuid);
CREATE INDEX IF NOT EXISTS idx_apis_is_public ON apis(is_public);

-- Create indexes for logs table
CREATE INDEX IF NOT EXISTS idx_logs_api_id ON logs(api_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_status_code ON logs(status_code);

-- Create a function to automatically generate UUIDs for new APIs
CREATE OR REPLACE FUNCTION generate_api_uuid()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.uuid IS NULL THEN
        NEW.uuid = gen_random_uuid();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate UUIDs
DROP TRIGGER IF EXISTS trigger_generate_api_uuid ON apis;
CREATE TRIGGER trigger_generate_api_uuid
    BEFORE INSERT ON apis
    FOR EACH ROW
    EXECUTE FUNCTION generate_api_uuid();

-- Create a view for API statistics
CREATE OR REPLACE VIEW api_stats AS
SELECT 
    a.id,
    a.name,
    a.url,
    COUNT(l.id) as total_checks,
    COUNT(CASE WHEN l.status_code < 400 THEN 1 END) as successful_checks,
    CASE 
        WHEN COUNT(l.id) > 0 THEN 
            ROUND((COUNT(CASE WHEN l.status_code < 400 THEN 1 END)::DECIMAL / COUNT(l.id)::DECIMAL) * 100, 2)
        ELSE 0 
    END as uptime_percentage,
    CASE 
        WHEN COUNT(l.id) > 0 THEN 
            ROUND(AVG(l.latency_ms))
        ELSE 0 
    END as avg_latency,
    MAX(l.created_at) as last_check,
    MAX(l.status_code) as last_status_code
FROM apis a
LEFT JOIN logs l ON a.id = l.api_id
GROUP BY a.id, a.name, a.url;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a function to clean up old logs (optional - for performance)
CREATE OR REPLACE FUNCTION cleanup_old_logs(days_to_keep INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM logs 
    WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to clean up old alerts (optional - for performance)
CREATE OR REPLACE FUNCTION cleanup_old_alerts(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM alerts 
    WHERE timestamp < NOW() - INTERVAL '1 day' * days_to_keep
    AND resolved = true;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample data for testing (optional)
-- INSERT INTO apis (name, url, cost_per_hour, is_public, user_id) VALUES 
-- ('Sample API', 'https://httpbin.org/status/200', 10.00, true, 'your-user-id-here');

-- Comments for reference:
-- 1. Run this script in your Supabase SQL Editor
-- 2. Make sure to replace 'your-user-id-here' with actual user ID if inserting sample data
-- 3. The script will create all necessary tables, indexes, and policies
-- 4. RLS policies ensure users can only access their own data
-- 5. The cleanup functions can be scheduled to run periodically for maintenance 