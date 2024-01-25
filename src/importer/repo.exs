defmodule SD.Repo do
  use Ecto.Repo,
    otp_app: :parse_xml,
    adapter: Ecto.Adapters.Postgres
  # ... (other configuration options)
end
