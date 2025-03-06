import pandas as pd

def convert_scholar_csv(input_file, output_file):
    # Read Google Scholar CSV
    df = pd.read_csv(input_file)
    
    # Map Google Scholar columns to our format
    df_out = pd.DataFrame({
        'title': df['Title'],
        'author': df['Authors'],
        'year': pd.to_numeric(df['Year'], errors='coerce'),
        'venue': df['Publication'],
        'venue_short': '',  # Need manual input
        'type': '',  # Need manual input
        'url': df['URL'],
        'note': ''  # Optional field
    })
    
    # Sort by year descending
    df_out = df_out.sort_values('year', ascending=False)
    
    # Save to CSV
    df_out.to_csv(output_file, index=False)

if __name__ == "__main__":
    convert_scholar_csv('./scripts/citations.csv', 'citations_out.csv')